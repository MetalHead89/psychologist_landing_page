export const useUserStore = defineStore('user', () => {
  const user: Ref<TUser | null> = ref(null)

  const setUser = (userData: TUser) => {
    user.value = userData
  }

  return { user, setUser }
})
