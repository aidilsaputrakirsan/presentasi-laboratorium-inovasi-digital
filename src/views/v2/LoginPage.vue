<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
        <div class="text-center mb-8">
           <div class="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">S</div>
           <h2 class="text-2xl font-black text-slate-900">Selamat Datang Kembali</h2>
           <p class="text-slate-400 mt-2 text-sm">Masuk untuk mengakses dashboard intelijen riset Anda</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Alamat Email</label>
            <input 
              type="email" 
              v-model="email"
              placeholder="nama@universitas.ac.id"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
            >
          </div>
          
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kata Sandi</label>
            <input 
              type="password" 
              v-model="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
            >
          </div>

          <button 
            type="submit" 
            class="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2"
            :disabled="isLoading"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span v-else>Masuk</span>
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-slate-100 text-center">
          <p class="text-xs text-slate-400">
            Untuk keperluan demo, masukkan email/kata sandi apa saja.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  if (!email.value) return
  
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    router.push('/v2/dashboard')
  }, 1000)
}
</script>
