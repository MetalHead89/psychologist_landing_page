<script lang="ts" setup>
import { CMS_ROUTE_DEFAULT } from '@/shared/constants.js'

const router = useRouter()

definePageMeta({
  layout: 'cms'
})

router.push({ name: CMS_ROUTE_DEFAULT })
</script>
