<template>
    <div class="py-12 flex flex-col items-center justify-center text-center">
      <div class="w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-sm">
        H
      </div>
      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
        H0ll0w's Space
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mb-8">
        欢迎来到我的个人博客。这里主要记录了我的前端、算法以及各种面经积累。
      </p>
      <div class="flex gap-4">
        <router-link to="/interviews" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition">
          查看面经
        </router-link>
        <a href="https://github.com/h0ll0w-akuzr0guy" target="_blank" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition">
          GitHub
        </a>
      </div>
    </div>
  </template>