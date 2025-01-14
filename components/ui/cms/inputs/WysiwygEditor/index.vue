<template>
  <ClientOnly>
    <component
      :is="editorComponent"
      :init="{
        content_css: '/tinymce/skins/content/default/content.min.css',
        skin_url: '/tinymce/skins/ui/oxide',
        language_url: '/tinymce/locales/ru.js',
        promotion: false,
        relative_urls: false,
        language: 'ru',
        statusbar: false,
        menubar: false,
        min_height: 300,
        plugins: EDITOR_PLUGINS,
        toolbar: EDITOR_TOOLBAR,
        font_size_formats: EDITOR_FONTSIZE_FORMATS.join(' '),
        contextmenu: EDITOR_CONTEXTMENU,
        images_file_types: 'jpg,svg,jpeg',
        file_picker_types: 'image',
        file_picker_callback: handleFileUpload
      }"
      license-key="gpl"
      v-bind="$attrs"
      @update:model-value="handleTextInput"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
if (import.meta.client) {
  await import('tinymce/tinymce')

  // Plugins
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/image/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/code/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/link/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/lists/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/table/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/autoresize/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/emoticons/plugin.min.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/emoticons/js/emojis.js')
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/plugins/fullscreen/plugin.min.js')

  // Models
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/models/dom/model.min.js')

  // Theme
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/themes/silver/theme.min.js')

  // Icons
  // @ts-expect-error: Модуль не имеет типов, но это ожидаемо
  await import('tinymce/icons/default/icons.min.js')
}

const EDITOR_PLUGINS = ['image', 'code', 'link', 'lists', 'table', 'autoresize', 'emoticons', 'fullscreen']
const EDITOR_TOOLBAR = [
  {
    name: 'history',
    items: ['undo', 'redo']
  },
  {
    name: 'font-style',
    items: ['bold', 'italic', 'underline', 'strikethrough']
  },
  {
    name: 'text-align',
    items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
  },
  {
    name: 'headers',
    items: ['h2', 'h3', 'h4', 'h5', 'h6']
  },
  {
    name: 'font',
    items: ['fontsize', 'lineheight']
  },
  {
    name: 'colors',
    items: ['forecolor', 'backcolor']
  },
  {
    name: 'utils',
    items: ['link', 'preButton', 'numlist', 'bullist', 'subscript', 'blockquote', 'superscript', 'hr']
  },
  {
    name: 'media',
    items: ['image', 'table', 'emoticons']
  },
  {
    name: 'clear',
    items: ['removeformat']
  },
  {
    name: 'additional',
    items: ['code', 'fullscreen']
  }
]
const EDITOR_FONTSIZE_FORMATS = ['8pt', '10pt', '12pt', '14pt', '16pt', '18pt', '24pt', '36pt', '48pt']
const EDITOR_CONTEXTMENU = ['bold', 'italic', 'underline', 'link', 'removeformat']

const { $api } = useNuxtApp()

const editorComponent = shallowRef<unknown>(null)

const emit = defineEmits(['update:model-value'])

onMounted(async () => {
  const { default: Editor } = await import('@tinymce/tinymce-vue')
  editorComponent.value = Editor
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleFileUpload = (callback: any) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/jpg, image/jpeg, image/svg')

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = (target.files) ? target.files[0] : null

    if (!file || !window.tinymce) {
      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const base64Image = (reader.result as string).split(',')[1]

      $api.articles.newImage({ base64Image })
        .then(imageUrl => {
          callback(imageUrl, { title: file.name })
        })
    })

    reader.readAsDataURL(file)
  })

  input.click()
}

const handleTextInput = (vale: string) => {
  emit('update:model-value', vale)
}
</script>
