<template>
  <div class="stat-card">
    <div class="flex items-center gap-3 mb-2">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"></path>
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-600 font-medium">{{ label }}</p>
        <p class="text-2xl font-bold text-slate-900">{{ value }}</p>
      </div>
    </div>
    <p v-if="subtitle" class="text-xs text-slate-500 mt-2">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    }
  }
}
</script>
