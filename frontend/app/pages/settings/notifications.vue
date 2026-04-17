<template>
  <div class="space-y-4">
    <div class="rounded-xl border bg-white p-5">
      <div class="text-sm font-semibold">Notification Admin</div>
      <div class="mt-1 text-sm text-slate-600">Kelola template, channel config, reminder schedule, dan delivery logs.</div>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-xl border bg-white p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="text-sm font-semibold">Templates</div>
            <div class="text-xs text-slate-500">Template per event dan channel.</div>
          </div>
          <Button label="Reload" severity="secondary" :disabled="loading" @click="load" />
        </div>

        <div class="mt-4 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <InputText v-model="templateForm.key" placeholder="template key" />
            <InputText v-model="templateForm.name" placeholder="template name" />
            <InputText v-model="templateForm.module" placeholder="module" />
            <InputText v-model="templateForm.eventKey" placeholder="event key" />
            <select v-model="templateForm.channel" class="h-10 rounded-md border px-2 text-sm">
              <option v-for="channel in channels" :key="channel" :value="channel">{{ channel }}</option>
            </select>
            <select v-model="templateForm.status" class="h-10 rounded-md border px-2 text-sm">
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <InputText v-model="templateForm.subject" placeholder="subject" />
          <textarea v-model="templateForm.body" class="w-full rounded-md border p-2 text-sm" rows="4" placeholder="body"></textarea>
          <div class="flex gap-2">
            <Button label="Preview" severity="secondary" @click="previewTemplate" />
            <Button label="Save Template" :disabled="!templateForm.key || !templateForm.name || !templateForm.body" @click="saveTemplate" />
          </div>
          <div v-if="preview.subject || preview.body" class="rounded-lg bg-slate-50 p-3 text-sm">
            <div class="font-medium">Preview Subject</div>
            <div>{{ preview.subject || '-' }}</div>
            <div class="mt-3 font-medium">Preview Body</div>
            <div>{{ preview.body || '-' }}</div>
          </div>
        </div>

        <div class="mt-4 overflow-hidden rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-left text-xs text-slate-600">
              <tr>
                <th class="px-3 py-2">Key</th>
                <th class="px-3 py-2">Channel</th>
                <th class="px-3 py-2">Status</th>
                <th class="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in templates" :key="item.id" class="border-t">
                <td class="px-3 py-2">{{ item.key }}</td>
                <td class="px-3 py-2">{{ item.channel }}</td>
                <td class="px-3 py-2">{{ item.status }}</td>
                <td class="px-3 py-2 text-right">
                  <div class="inline-flex gap-2">
                    <Button label="Edit" size="small" severity="secondary" @click="editTemplate(item)" />
                    <Button label="Delete" size="small" severity="danger" @click="deleteTemplate(item.id)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-xl border bg-white p-5">
          <div class="text-sm font-semibold">Channel Config</div>
          <div class="mt-4 space-y-3">
            <div v-for="channel in channels" :key="channel" class="rounded-lg border p-3 text-sm">
              <div class="flex items-center justify-between gap-3">
                <div class="font-medium">{{ channel }}</div>
                <label class="flex items-center gap-2 text-xs">
                  <input v-model="channelForms[channel].isEnabled" type="checkbox" />
                  Enabled
                </label>
              </div>
              <InputText v-model="channelForms[channel].provider" class="mt-3 w-full" placeholder="provider" />
              <textarea v-model="channelForms[channel].configText" class="mt-3 w-full rounded-md border p-2 text-xs" rows="4" placeholder='{"apiKey":"..."}'></textarea>
              <div class="mt-3 flex justify-end">
                <Button label="Save" size="small" @click="saveChannelConfig(channel)" />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-xl border bg-white p-5">
          <div class="text-sm font-semibold">Reminder Scheduler</div>
          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <InputText v-model="scheduleForm.eventKey" placeholder="event key" />
            <select v-model="scheduleForm.channel" class="h-10 rounded-md border px-2 text-sm">
              <option value="">Auto</option>
              <option v-for="channel in channels" :key="channel" :value="channel">{{ channel }}</option>
            </select>
            <InputText v-model="scheduleForm.targetUserId" placeholder="target user id" />
            <InputText v-model="scheduleForm.title" placeholder="title" />
            <InputText v-model="scheduleForm.scheduledFor" type="datetime-local" placeholder="schedule" />
            <InputText v-model="scheduleForm.message" placeholder="message" />
          </div>
          <div class="mt-3 flex justify-end">
            <Button label="Create Schedule" :disabled="!scheduleForm.eventKey || !scheduleForm.message || !scheduleForm.scheduledFor" @click="createSchedule" />
          </div>
          <div class="mt-4 overflow-hidden rounded-lg border">
            <table class="w-full text-sm">
              <thead class="bg-slate-50 text-left text-xs text-slate-600">
                <tr>
                  <th class="px-3 py-2">Event</th>
                  <th class="px-3 py-2">Schedule</th>
                  <th class="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in schedules" :key="item.id" class="border-t">
                  <td class="px-3 py-2">{{ item.eventKey }}</td>
                  <td class="px-3 py-2">{{ fmt(item.scheduledFor) }}</td>
                  <td class="px-3 py-2">{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-xl border bg-white p-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="text-sm font-semibold">Delivery Logs</div>
          <div class="text-xs text-slate-500">Riwayat pengiriman notifikasi.</div>
        </div>
        <div class="flex gap-2">
          <select v-model="logFilter.channel" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Channel</option>
            <option v-for="channel in channels" :key="channel" :value="channel">{{ channel }}</option>
          </select>
          <select v-model="logFilter.status" class="h-10 rounded-md border px-2 text-sm">
            <option value="">All Status</option>
            <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
          </select>
          <Button label="Apply" severity="secondary" @click="loadLogs" />
        </div>
      </div>

      <div class="mt-4 overflow-hidden rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-left text-xs text-slate-600">
            <tr>
              <th class="px-3 py-2">Created</th>
              <th class="px-3 py-2">Recipient</th>
              <th class="px-3 py-2">Channel</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2">Message</th>
              <th class="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in logs" :key="item.id" class="border-t align-top">
              <td class="px-3 py-2 text-xs">{{ fmt(item.createdAt) }}</td>
              <td class="px-3 py-2 text-xs">{{ item.recipient?.email || '-' }}</td>
              <td class="px-3 py-2 text-xs">{{ item.channel }}</td>
              <td class="px-3 py-2 text-xs">{{ item.status }}</td>
              <td class="px-3 py-2 text-xs">{{ item.message }}</td>
              <td class="px-3 py-2 text-right">
                <Button label="Resend" size="small" severity="secondary" @click="resend(item.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>
      <div v-if="success" class="mt-3 text-sm text-emerald-700">{{ success }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi()
const auth = useAuthStore()
const canManage = computed(() => auth.hasPermission('notification.manage'))

const channels = ['IN_APP', 'EMAIL', 'WHATSAPP', 'SMS']
const statuses = ['PENDING', 'QUEUED', 'SENT', 'FAILED', 'READ']

const loading = ref(false)
const error = ref('')
const success = ref('')
const templates = ref<any[]>([])
const logs = ref<any[]>([])
const schedules = ref<any[]>([])
const preview = ref({ subject: '', body: '' })
const logFilter = reactive({ channel: '', status: '' })
const templateForm = reactive({
  id: '',
  key: '',
  name: '',
  module: '',
  eventKey: '',
  channel: 'IN_APP',
  subject: '',
  body: '',
  status: 'ACTIVE',
})
const scheduleForm = reactive({
  eventKey: '',
  channel: '',
  targetUserId: '',
  title: '',
  message: '',
  scheduledFor: '',
})
const channelForms = reactive<Record<string, { provider: string; isEnabled: boolean; configText: string }>>({
  IN_APP: { provider: 'internal', isEnabled: true, configText: '{}' },
  EMAIL: { provider: '', isEnabled: false, configText: '{}' },
  WHATSAPP: { provider: '', isEnabled: false, configText: '{}' },
  SMS: { provider: '', isEnabled: false, configText: '{}' },
})

function fmt(value: string) {
  return new Date(value).toLocaleString('id-ID')
}

function resetTemplateForm() {
  templateForm.id = ''
  templateForm.key = ''
  templateForm.name = ''
  templateForm.module = ''
  templateForm.eventKey = ''
  templateForm.channel = 'IN_APP'
  templateForm.subject = ''
  templateForm.body = ''
  templateForm.status = 'ACTIVE'
}

function safeParse(text: string) {
  try {
    return JSON.parse(text || '{}')
  } catch {
    return {}
  }
}

async function load() {
  if (!canManage.value) return
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const [templateRes, configRes, logRes, scheduleRes] = await Promise.all([
      api.get('/notifications/admin/templates'),
      api.get('/notifications/admin/channel-configs'),
      api.get('/notifications/admin/logs'),
      api.get('/notifications/admin/schedules'),
    ])
    templates.value = templateRes.data?.data ?? []
    logs.value = logRes.data?.data ?? []
    schedules.value = scheduleRes.data?.data ?? []
    for (const config of configRes.data?.data ?? []) {
      channelForms[config.channel] = {
        provider: config.provider || '',
        isEnabled: !!config.isEnabled,
        configText: JSON.stringify(config.config ?? {}, null, 2),
      }
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e.message
  } finally {
    loading.value = false
  }
}

async function previewTemplate() {
  const res = await api.post('/notifications/admin/templates/preview', {
    subject: templateForm.subject,
    body: templateForm.body,
    payload: { user: { name: 'Demo User' }, amount: 1500000, docNo: 'DOC-001' },
  })
  preview.value = res.data
}

async function saveTemplate() {
  error.value = ''
  success.value = ''
  const payload = {
    key: templateForm.key,
    name: templateForm.name,
    module: templateForm.module || undefined,
    eventKey: templateForm.eventKey || undefined,
    channel: templateForm.channel,
    subject: templateForm.subject || undefined,
    body: templateForm.body,
    variables: {},
    status: templateForm.status,
  }
  try {
    if (templateForm.id) await api.patch(`/notifications/admin/templates/${templateForm.id}`, payload)
    else await api.post('/notifications/admin/templates', payload)
    success.value = 'Template saved'
    resetTemplateForm()
    await load()
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e.message
  }
}

function editTemplate(item: any) {
  templateForm.id = item.id
  templateForm.key = item.key
  templateForm.name = item.name
  templateForm.module = item.module || ''
  templateForm.eventKey = item.eventKey || ''
  templateForm.channel = item.channel
  templateForm.subject = item.subject || ''
  templateForm.body = item.body
  templateForm.status = item.status
}

async function deleteTemplate(id: string) {
  await api.delete(`/notifications/admin/templates/${id}`)
  await load()
}

async function saveChannelConfig(channel: string) {
  const form = channelForms[channel]
  await api.put(`/notifications/admin/channel-configs/${channel}`, {
    channel,
    provider: form.provider || undefined,
    isEnabled: form.isEnabled,
    config: safeParse(form.configText),
  })
  success.value = `${channel} config saved`
  await load()
}

async function createSchedule() {
  await api.post('/notifications/admin/schedules', {
    eventKey: scheduleForm.eventKey,
    channel: scheduleForm.channel || undefined,
    targetUserId: scheduleForm.targetUserId || undefined,
    title: scheduleForm.title || undefined,
    message: scheduleForm.message,
    payload: {},
    scheduledFor: new Date(scheduleForm.scheduledFor).toISOString(),
  })
  success.value = 'Schedule created'
  scheduleForm.eventKey = ''
  scheduleForm.channel = ''
  scheduleForm.targetUserId = ''
  scheduleForm.title = ''
  scheduleForm.message = ''
  scheduleForm.scheduledFor = ''
  await load()
}

async function loadLogs() {
  const res = await api.get('/notifications/admin/logs', {
    params: { channel: logFilter.channel || undefined, status: logFilter.status || undefined },
  })
  logs.value = res.data?.data ?? []
}

async function resend(id: string) {
  await api.post(`/notifications/admin/logs/${id}/resend`)
  success.value = 'Notification requeued'
  await loadLogs()
}

onMounted(load)
</script>
