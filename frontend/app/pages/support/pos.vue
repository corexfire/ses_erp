<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ShoppingCart, 
  User, 
  Search, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Trash2, 
  Plus, 
  Minus,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List
} from 'lucide-vue-next'

const categories = ['All', 'Hardware', 'Software', 'Services', 'Consulting']
const selectedCategory = ref('All')
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')

const products = ref([
  { id: 1, name: 'ERP License Enterprise', category: 'Software', price: 150000000, stock: 99, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Cloud Server Pro', category: 'Hardware', price: 25000000, stock: 12, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Security Audit', category: 'Services', price: 15000000, stock: 50, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Tech Support (Yearly)', category: 'Services', price: 10000000, stock: 100, image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Database Migration', category: 'Consulting', price: 35000000, stock: 5, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop' },
])

const cart = ref<any[]>([])
const customer = ref({ name: 'Walk-in Customer', email: 'guest@example.com' })

const addToCart = (product: any) => {
  const item = cart.value.find(i => i.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const removeFromCart = (productId: number) => {
  cart.value = cart.value.filter(i => i.id !== productId)
}

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
const tax = computed(() => subtotal.value * 0.11)
const total = computed(() => subtotal.value + tax.value)

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesCat = selectedCategory.value === 'All' || p.category === selectedCategory.value
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesSearch
  })
})

const checkoutStatus = ref<'idle' | 'processing' | 'success'>('idle')
const handleCheckout = () => {
  checkoutStatus.value = 'processing'
  setTimeout(() => {
    checkoutStatus.value = 'success'
    setTimeout(() => {
      cart.value = []
      checkoutStatus.value = 'idle'
    }, 2000)
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col p-4 md:p-6 gap-6 font-sans">
    <!-- Header Area -->
    <header class="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
          <ShoppingCart class="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white">SES Point of Sale</h1>
          <p class="text-sm text-slate-400">Station 01 • Main Showroom</p>
        </div>
      </div>
      
      <div class="flex items-center gap-3 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="w-full bg-transparent border-none focus:ring-0 text-sm py-2 pl-9"
          />
        </div>
        <div class="flex border-l border-slate-700 pl-2 gap-1">
          <button @click="viewMode = 'grid'" :class="[viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500']" class="p-2 rounded-lg transition-colors">
            <LayoutGrid class="w-4 h-4" />
          </button>
          <button @click="viewMode = 'list'" :class="[viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500']" class="p-2 rounded-lg transition-colors">
            <List class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="flex items-center gap-4 border-l border-slate-800 pl-4 hidden md:flex">
        <div class="text-right">
          <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Operator</p>
          <p class="text-sm font-medium">Budi Santoso</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
          <img src="https://i.pravatar.cc/100?u=budi" alt="Operator" />
        </div>
      </div>
    </header>

    <div class="flex flex-col lg:flex-row gap-6 flex-1 h-0 overflow-hidden">
      <!-- Catalog Area -->
      <div class="flex-1 flex flex-col gap-6 overflow-hidden">
        <!-- Categories -->
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[selectedCategory === cat ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/40' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200']"
            class="px-6 py-2.5 rounded-xl border text-sm font-medium whitespace-nowrap transition-all duration-300 transform active:scale-95"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Product Grid -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div :class="[viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'flex flex-col gap-3']">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id"
              class="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all duration-300 relative flex flex-col h-full active:scale-[0.98]"
            >
              <div v-if="viewMode === 'grid'" class="aspect-video relative overflow-hidden h-40">
                <img :src="product.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                <div class="absolute bottom-3 left-3">
                  <span class="px-2 py-1 bg-slate-900/80 rounded-md text-[10px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter">
                    {{ product.category }}
                  </span>
                </div>
              </div>

              <div class="p-4 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-bold text-slate-100 line-clamp-1">{{ product.name }}</h3>
                </div>
                
                <div class="mt-auto flex justify-between items-center">
                  <div>
                    <p class="text-xs text-slate-500 mb-0.5">Price</p>
                    <p class="text-lg font-black text-emerald-400">{{ formatCurrency(product.price) }}</p>
                  </div>
                  <button 
                    @click="addToCart(product)"
                    class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-500 active:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/50"
                  >
                    <Plus class="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div v-if="viewMode === 'list'" class="absolute right-4 top-1/2 -translate-y-1/2">
                 <!-- Price display in list view if needed -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar / Cart Area -->
      <aside class="w-full lg:w-[400px] flex flex-col gap-6 h-full overflow-hidden">
        <!-- Cart Card -->
        <div class="flex-1 bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
          <!-- Customer Selection -->
          <div class="p-6 border-b border-slate-800">
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-bold flex items-center gap-2">
                <ShoppingCart class="w-4 h-4 text-emerald-400" />
                Current Order
              </h2>
              <button class="text-xs text-slate-500 underline">Clear Order</button>
            </div>
            
            <div class="flex items-center gap-3 p-3 bg-slate-800/40 rounded-2xl border border-slate-800/50">
              <div class="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                <User class="w-5 h-5 text-indigo-400" />
              </div>
              <div class="flex-1 overflow-hidden">
                <p class="text-sm font-bold text-white truncate">{{ customer.name }}</p>
                <p class="text-[10px] text-slate-500 truncate">{{ customer.email }}</p>
              </div>
              <button class="text-[10px] font-bold bg-slate-700 px-2 py-1 rounded text-slate-300 uppercase tracking-wider uppercase">Edit</button>
            </div>
          </div>

          <!-- Items List -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-full opacity-20 py-20">
              <ShoppingCart class="w-16 h-16 mb-4" />
              <p class="font-bold uppercase tracking-widest text-sm">Cart is Empty</p>
            </div>
            
            <div v-for="item in cart" :key="item.id" class="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300">
              <div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                <img :src="item.image" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-bold text-white mb-1 leading-tight">{{ item.name }}</h4>
                <p class="text-[10px] text-slate-500 mb-2">{{ formatCurrency(item.price) }} / unit</p>
                <div class="flex items-center gap-2">
                  <div class="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-0.5">
                    <button @click="item.quantity > 1 ? item.quantity-- : removeFromCart(item.id)" class="p-1 hover:text-emerald-400">
                      <Minus class="w-3 h-3" />
                    </button>
                    <span class="w-8 text-center text-[10px] font-bold">{{ item.quantity }}</span>
                    <button @click="item.quantity++" class="p-1 hover:text-emerald-400">
                      <Plus class="w-3 h-3" />
                    </button>
                  </div>
                  <button @click="removeFromCart(item.id)" class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-rose-500 p-1">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs font-black text-slate-100">{{ formatCurrency(item.price * item.quantity) }}</p>
              </div>
            </div>
          </div>

          <!-- Totals Area -->
          <div class="p-6 bg-slate-900 border-t border-slate-800 relative z-10">
            <div class="space-y-2 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500 font-medium">Subtotal</span>
                <span class="font-bold text-slate-300">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-500 font-medium whitespace-nowrap">Tax (PPN 11%)</span>
                <span class="font-bold text-slate-300">{{ formatCurrency(tax) }}</span>
              </div>
              <div class="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span class="font-black uppercase tracking-widest text-slate-400">TOTAL</span>
                <span class="text-3xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <div v-if="checkoutStatus === 'success'" class="bg-emerald-500 text-white rounded-2xl p-4 flex items-center justify-center gap-2 animate-in zoom-in duration-300">
              <CheckCircle2 class="w-6 h-6" />
              <span class="font-bold">Order Completed!</span>
            </div>
            
            <div v-else class="grid grid-cols-2 gap-3">
              <button 
                :disabled="cart.length === 0 || checkoutStatus === 'processing'"
                @click="handleCheckout"
                class="col-span-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 h-14 group overflow-hidden relative"
              >
                <span v-if="checkoutStatus === 'processing'" class="flex items-center gap-2">
                  <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  PROCESSING...
                </span>
                <template v-else>
                  <CreditCard class="w-5 h-5 group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
                  CONFIRM & CHECKOUT
                </template>
              </button>
              <button class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700 h-12">
                <Banknote class="w-4 h-4" />
                Cash
              </button>
              <button class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700 h-12">
                <QrCode class="w-4 h-4" />
                QRIS
              </button>
            </div>
          </div>
        </div>

        <!-- System Info -->
        <div class="bg-slate-900/30 border border-slate-800 p-3 rounded-2xl flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
          <div class="flex gap-4">
            <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> System Online</span>
            <span class="flex items-center gap-1">v4.0.2 Ent.</span>
          </div>
          <span class="text-emerald-500/80 font-bold">Sync Secured</span>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>
