<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useApi } from '~/composables/useApi'

const api = useApi()
const loading = ref(false)
const currentShift = ref<any>(null)
const cart = ref<Array<{ id: string; name: string; price: number; quantity: number }>>([])
const paymentMethod = ref('CASH')
const splitPayments = ref<Array<{ method: string; amount: number; cardType?: string }>>([])
const showSplitModal = ref(false)
const searchQuery = ref('')
const items = ref<any[]>([])
const selectedCustomer = ref<any>(null)
const showCustomerModal = ref(false)
const customerSearch = ref('')
const checkoutStatus = ref<'idle' | 'processing' | 'success'>('idle')

const splitForm = ref({
  cash: 0,
  card: 0,
  ewallet: 0
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
const tax = computed(() => subtotal.value * 0.11)
const total = computed(() => subtotal.value + tax.value)

const loadCurrentShift = async () => {
  try {
    const res = await api.get('/pos/shift/current')
    currentShift.value = res.data.shift
  } catch (e) {
    currentShift.value = null
  }
}

const loadItems = async () => {
  try {
    const res = await api.get('/inventory/items', { params: { limit: 50 } })
    items.value = (res.data.items || []).map((i: any) => ({ ...i, price: Number(i.standardCost || 0), name: i.name }))
  } catch (e) {
    items.value = []
  }
}

const addToCart = (item: any) => {
  const existing = cart.value.find(c => c.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ id: item.id, name: item.name, price: item.price, quantity: 1 })
  }
}

const removeFromCart = (id: string) => {
  cart.value = cart.value.filter(c => c.id !== id)
}

const lookupCustomer = async () => {
  if (!customerSearch.value) return
  try {
    const res = await api.post('/pos/loyalty/lookup', { phone: customerSearch.value })
    if (res.data.customer) {
      selectedCustomer.value = res.data.customer
    } else {
      alert('Customer not found')
    }
  } catch (e) {
    alert('Customer not found')
  }
}

const processPayment = async () => {
  if (!currentShift.value) {
    alert('No active shift. Please open a shift first.')
    return
  }
  if (cart.value.length === 0) {
    alert('Cart is empty')
    return
  }

  loading.value = true
  checkoutStatus.value = 'processing'

  try {
    const payload: any = {
      shiftId: currentShift.value.id,
      items: cart.value.map(c => ({ itemId: c.id, quantity: c.quantity, unitPrice: c.price })),
      paymentMethod: paymentMethod.value
    }

    if (selectedCustomer.value) {
      payload.customerId = selectedCustomer.value.id
    }

    if (paymentMethod.value === 'SPLIT') {
      payload.splitPayments = splitPayments.value.filter(p => p.amount > 0)
    }

    await api.post('/pos/transactions', payload)
    
    checkoutStatus.value = 'success'
    cart.value = []
    selectedCustomer.value = null
    
    setTimeout(() => {
      checkoutStatus.value = 'idle'
    }, 2000)
  } catch (e: any) {
    alert(e.response?.data?.message || 'Payment failed')
    checkoutStatus.value = 'idle'
  } finally {
    loading.value = false
  }
}

const openSplitModal = () => {
  splitForm.value = { cash: 0, card: 0, ewallet: 0 }
  showSplitModal.value = true
}

const applySplit = () => {
  splitPayments.value = []
  if (splitForm.value.cash > 0) splitPayments.value.push({ method: 'CASH', amount: splitForm.value.cash })
  if (splitForm.value.card > 0) splitPayments.value.push({ method: 'CARD', amount: splitForm.value.card })
  if (splitForm.value.ewallet > 0) splitPayments.value.push({ method: 'E-WALLET', amount: splitForm.value.ewallet })
  showSplitModal.value = false
  paymentMethod.value = 'SPLIT'
}

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value.slice(0, 20)
  return items.value.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase())).slice(0, 20)
})

onMounted(() => {
  loadCurrentShift()
  loadItems()
})
</script>

<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-shopping-cart text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          POS <span class="text-indigo-600">Checkout</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Process transactions with split payment support.</p>
      </div>
      <div class="flex gap-2">
        <span v-if="currentShift" class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">
          Shift: {{ currentShift.terminalId }}
        </span>
        <span v-else class="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-sm font-bold">
          No Active Shift
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      <div class="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-50 p-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search items..." 
              class="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            <div 
              v-for="item in filteredItems" 
              :key="item.id"
              @click="addToCart(item)"
              class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <div class="text-sm font-bold text-slate-800 line-clamp-2 mb-2">{{ item.name }}</div>
              <div class="text-lg font-black text-indigo-600">{{ formatCurrency(item.price) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-50 flex-1 flex flex-col overflow-hidden">
          <div class="p-4 border-b border-slate-100">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-slate-800">Current Order</h3>
              <button v-if="cart.length" @click="cart = []" class="text-xs text-rose-500 font-bold">Clear</button>
            </div>
            <div v-if="selectedCustomer" class="mt-2 p-2 bg-indigo-50 rounded-lg flex items-center gap-2">
              <i class="pi pi-user text-indigo-500"></i>
              <span class="text-sm font-bold text-indigo-800">{{ selectedCustomer.name }}</span>
              <button @click="selectedCustomer = null" class="ml-auto text-indigo-400">×</button>
            </div>
            <Button v-else label="Add Customer" icon="pi pi-user" text size="small" class="mt-2" @click="showCustomerModal = true" />
          </div>

          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div v-if="cart.length === 0" class="text-center text-slate-400 py-12">
              <i class="pi pi-shopping-cart text-4xl mb-2"></i>
              <p class="text-sm">Cart is empty</p>
            </div>
            <div v-for="item in cart" :key="item.id" class="flex gap-3 items-center">
              <div class="flex-1">
                <div class="text-sm font-bold text-slate-800">{{ item.name }}</div>
                <div class="text-xs text-slate-500">{{ formatCurrency(item.price) }} × {{ item.quantity }}</div>
              </div>
              <div class="text-sm font-bold text-slate-800">{{ formatCurrency(item.price * item.quantity) }}</div>
              <button @click="removeFromCart(item.id)" class="text-rose-500 p-1"><i class="pi pi-times"></i></button>
            </div>
          </div>

          <div class="p-4 bg-slate-50 border-t border-slate-100">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-500">Subtotal</span>
              <span class="font-bold">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-500">Tax (11%)</span>
              <span class="font-bold">{{ formatCurrency(tax) }}</span>
            </div>
            <div class="flex justify-between text-lg font-black pt-2 border-t border-slate-200">
              <span>TOTAL</span>
              <span class="text-indigo-600">{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-50 p-4 space-y-3">
          <div class="flex gap-2">
            <Button 
              :class="paymentMethod === 'CASH' ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-slate-200 text-slate-600'"
              class="flex-1"
              @click="paymentMethod = 'CASH'"
            >
              <i class="pi pi-money-bill mr-1"></i> Cash
            </Button>
            <Button 
              :class="paymentMethod === 'CARD' ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200 text-slate-600'"
              class="flex-1"
              @click="paymentMethod = 'CARD'"
            >
              <i class="pi pi-credit-card mr-1"></i> Card
            </Button>
            <Button 
              :class="paymentMethod === 'SPLIT' ? 'bg-amber-600 border-amber-600' : 'bg-white border-slate-200 text-slate-600'"
              class="flex-1"
              @click="openSplitModal"
            >
              <i class="pi pi-wallet mr-1"></i> Split
            </Button>
          </div>

          <div v-if="paymentMethod === 'SPLIT'" class="text-xs bg-amber-50 p-2 rounded-lg">
            <div v-for="(sp, idx) in splitPayments" :key="idx" class="flex justify-between">
              <span>{{ sp.method }}</span>
              <span class="font-bold">{{ formatCurrency(sp.amount) }}</span>
            </div>
          </div>

          <Button 
            label="PROCESS PAYMENT" 
            icon="pi pi-check" 
            class="w-full"
            size="large"
            :loading="checkoutStatus === 'processing'"
            :disabled="cart.length === 0 || !currentShift"
            @click="processPayment"
          />
        </div>
      </div>
    </div>

    <Dialog v-model:visible="showCustomerModal" header="Add Customer" modal class="w-[400px]">
      <div class="space-y-4">
        <InputText v-model="customerSearch" placeholder="Phone or name..." class="w-full" />
        <Button label="Search" @click="lookupCustomer" />
      </div>
      <template #footer>
        <Button label="Close" text @click="showCustomerModal = false" />
      </template>
    </Dialog>

    <Dialog v-model:visible="showSplitModal" header="Split Payment" modal class="w-[400px]">
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Cash Amount</label>
          <InputNumber v-model="splitForm.cash" mode="currency" currency="IDR" locale="id-ID" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Card Amount</label>
          <InputNumber v-model="splitForm.card" mode="currency" currency="IDR" locale="id-ID" class="w-full" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">E-Wallet Amount</label>
          <InputNumber v-model="splitForm.ewallet" mode="currency" currency="IDR" locale="id-ID" class="w-full" />
        </div>
        <div class="bg-slate-50 p-3 rounded-xl flex justify-between font-bold">
          <span>Total:</span>
          <span>{{ formatCurrency(splitForm.cash + splitForm.card + splitForm.ewallet) }}</span>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" text @click="showSplitModal = false" />
        <Button label="Apply" @click="applySplit" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>