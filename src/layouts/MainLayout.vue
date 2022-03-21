<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Star Wars API - Teste FastProBR </q-toolbar-title>

        <div class="avatar text-white rounded-borders row flex-center q-mt-md">
          <q-btn flat size="sm">
            <q-chip size="md" flat>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              {{ user ? user.username : "teste" }}
            </q-chip>
            <q-menu>
              <q-list
                class="foto-logout"
                style="min-width: 210px; min-height: 150px"
              >
                <q-item clickable v-close-popup>
                  <q-item-section
                    ><q-img
                      class="absolute-top"
                      src="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpapers-6.jpg"
                      style="height: 150px"
                    >
                      <div class="absolute-bottom bg-transparent items-center">
                        <q-avatar size="56px" class="q-mb-sm items-center">
                          <img
                            src="https://cdn.quasar.dev/img/boy-avatar.png"
                          />
                        </q-avatar>
                        <div class="q-pb-md text-weight-bold">
                          {{ user ? user.username : "teste" }}
                        </div>
                        <div class="row">
                          <div class="col-8 rounded-borders"></div>
                          <q-space />
                          <div class="col-3 rounded-borders">
                            {{ user ? user.email : "email"
                            }}<q-btn @click="sair()" outline size="sm"
                              >Sair</q-btn
                            >
                          </div>
                        </div>
                      </div>
                    </q-img></q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { userKey } from "src/shared/global";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      user: computed(() => store.state.auth.user),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      sair() {
        /* this.logout(); */
        sessionStorage.removeItem(userKey);
        this.$router.push("/login");
      },
    };
  },
});
</script>
