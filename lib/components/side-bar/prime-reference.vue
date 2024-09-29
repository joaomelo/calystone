<template>
  <div
    id="app-sidebar-9"
    class="h-screen bg-surface-0 dark:bg-surface-950 hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-10 border-r border-surface w-72 lg:w-16 select-none"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-center flex-shrink-0 bg-primary h-[60px]">
        <svg
          height="36"
          viewBox="0 0 48 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.1548 9.65956L23.9913 4.86169L5.54723 14.5106L0.924465 12.0851L23.9913 0L37.801 7.23403L33.1548 9.65956ZM23.9931 19.3085L42.4255 9.65955L47.0717 12.0851L23.9931 24.1595L10.1952 16.9361L14.8297 14.5106L23.9931 19.3085ZM4.6345 25.8937L0 23.4681V37.9149L23.0669 50V45.1489L4.6345 35.4894V25.8937ZM18.4324 28.2658L0 18.6169V13.7658L23.0669 25.8403V40.2977L18.4324 37.8615V28.2658ZM38.7301 23.468V18.6169L24.9205 25.8403V49.9999L29.555 47.5743V28.2659L38.7301 23.468ZM43.3546 35.4892V16.1914L48.0008 13.7659V37.9148L34.1912 45.1488V40.2977L43.3546 35.4892Z"
            class="fill-primary-contrast"
          />
        </svg>
      </div>
      <div class="mt-4">
        <ul class="list-none p-0 m-0">
          <li>
            <a
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-primary-emphasis border-l-2 border-primary-emphasis hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <i class="pi pi-home mr-2 lg:mr-0 text-base lg:!text-2xl leading-none" />
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Home</span>
            </a>
          </li>
          <li>
            <a
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <i class="pi pi-search mr-2 lg:mr-0 text-base lg:!text-2xl leading-none" />
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Search</span>
            </a>
          </li>
          <li>
            <a
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <i class="pi pi-users mr-2 lg:mr-0 text-base lg:!text-2xl leading-none" />
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Team</span>
            </a>
          </li>
          <li class="relative">
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                leaveToClass: 'hidden',
                hideOnOutsideClick: true
              }"
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <OverlayBadge
                severity="danger"
                class="mr-2 lg:mr-0"
              >
                <i class="pi pi-chart-line text-base lg:!text-2xl leading-none" />
              </OverlayBadge>
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Reports</span>
              <i class="pi pi-chevron-down ml-auto lg:hidden" />
            </a>
            <ul
              class="list-none pl-4 pr-0 py-0 lg:p-4 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out static rounded-r lg:absolute left-full top-0 z-10 bg-surface-0 dark:bg-surface-900 shadow-none lg:shadow w-full lg:w-60"
            >
              <li>
                <a
                  v-styleclass="{
                    selector: '@next',
                    toggleClass: 'hidden'
                  }"
                  class="flex items-center cursor-pointer p-4 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-0 rounded-border text-surface-600 dark:text-surface-200 hover:text-surface-700 dark:hover:text-surface-100 duration-150 transition-colors"
                >
                  <i class="pi pi-chart-line mr-2" />
                  <span class="font-medium">Revenue</span>
                  <i class="pi pi-chevron-down ml-auto" />
                </a>
                <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                  <li>
                    <a
                      class="flex items-center cursor-pointer p-4 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-0 rounded-border text-surface-600 dark:text-surface-200 hover:text-surface-700 dark:hover:text-surface-100 duration-150 transition-colors"
                    >
                      <i class="pi pi-table mr-2" />
                      <span class="font-medium">View</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="flex items-center cursor-pointer p-4 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-0 rounded-border text-surface-600 dark:text-surface-200 hover:text-surface-700 dark:hover:text-surface-100 duration-150 transition-colors"
                    >
                      <i class="pi pi-search mr-2" />
                      <span class="font-medium">Search</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  class="flex items-center cursor-pointer p-4 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-0 rounded-border text-surface-600 dark:text-surface-200 hover:text-surface-700 dark:hover:text-surface-100 duration-150 transition-colors"
                >
                  <i class="pi pi-chart-line mr-2" />
                  <span class="font-medium">Expenses</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <i class="pi pi-calendar mr-2 lg:mr-0 text-base lg:!text-2xl leading-none" />
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Events</span>
            </a>
          </li>
          <li>
            <a
              class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
            >
              <i class="pi pi-cog mr-2 lg:mr-0 text-base lg:!text-2xl leading-none" />
              <span class="font-medium inline text-base lg:text-xs lg:hidden">Options</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="mt-auto">
        <hr class="mx-4 border-t border-0 border-surface">
        <a
          class="my-4 flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
        >
          <i class="pi pi-sign-out mr-2 lg:mr-0 text-base lg:!text-2xl leading-none text-primary" />
          <span class="font-medium inline lg:hidden">Sign Out</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import OverlayBadge from "primevue/overlaybadge";
</script>
