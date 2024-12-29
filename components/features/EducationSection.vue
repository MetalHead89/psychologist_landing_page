<template>
  <div class="page-section education-section">
    <h2 class="title accent-text">
      {{ $t('education.title') }}
    </h2>

    <div
      v-for="({ title, items }, index) in education"
      :key="index"
      class="section"
    >
      <h3>
        {{ title }}
      </h3>

      <ul>
        <li
          v-for="({ title: itemTitle, document, image }, itemIndex) in items"
          :key="itemIndex"
        >
          {{ itemTitle }}

          <span v-if="document">
            (<span
              class="link-global"
              @click="onShowDocument(image)"
            >{{ document }}</span>)
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useModal } from 'vue-final-modal'
import UiImageViewer from '@/components/ui/ImageViewer.vue'

const education = [
  {
    title: 'Высшее образование',
    items: [
      {
        title: 'КГПУ им. В.П. Астафьева, ученая степень – магистр. Направленность (профиль) образовательной программы – мастерство психологического консультирования, г. Красноярск, 2024г.',
        document: 'диплом',
        image: useAssetImage('/images/documents/diploma.jpeg')
      },
      {
        title: 'Профессиональный демонстрационный экзамен по направлению подготовки 44.04.02. Психолого-педагогическое образование, г. Красноярск, 2024г.',
        document: 'свидетельство',
        image: useAssetImage('/images/documents/svidetelstvo_o_rezultatah_professionalnogo_demonstracionnogo_jekzamena.jpg')
      }
    ]
  },
  {
    title: 'Профессиональная переподготовка',
    items: [
      {
        title: 'Когнитивная поведенческая психотерапия (7 ступеней) – 252 часа, г. Санкт-Петербург, 2025г.'
      },
      {
        title: '«Семейный психолог» - 640 часов, г. Москва, 2021г.',
        document: 'диплом',
        image: useAssetImage('/images/documents/semejnyj_psiholog.jpg')
      },
      {
        title: '«Организация деятельности психолога в социальной сфере» - 600 часов, г. Смоленск, 2020г.',
        document: 'диплом',
        image: useAssetImage('/images/documents/organizacija_dejatelnosti_psihologa_v_socialnoj_sfere.jpg')
      },
      {
        title: '«Клиническая психология: теория и методика преподавания в образовательной организации» - 600 часов, г. Смоленск, 2019г.',
        document: 'диплом',
        image: useAssetImage('/images/documents/klinicheskaja_psihologija_teorija_i_metodika_prepodavanija_v_obrazovatelnoj_organizacii.jpg')
      }
    ]
  },
  {
    title: 'Повышение квалификации',
    items: [
      {
        title: 'Трансформационная психологическая игра. «Мама. Свобода быть собой», 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/mama_svoboda_byt_soboj.jpg')
      },
      {
        title: 'Трансформационная психологическая игра. «Папа. Свобода. Сила. Уверенность», 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/papa_opora_sila_uverennost.jpg')
      },
      {
        title: '«Когнитивно-поведенческая терапия детей и подростков» - 144 ч., г. Москва, 2023г.',
        document: 'удостоверение',
        image: useAssetImage('/images/documents/kognetivno_povedenchiskaja_terapija_dlja_detej_i_podrostkov.jpg')
      },
      {
        title: '«Логотерапия в семейном консультировании. Практический подход в работе с утратой смысла жизни» - 144 ч., г. Москва, 2023г.',
        document: 'удостоверение',
        image: useAssetImage('/images/documents/logoterapija_v_semejnom_konsultirovanii.jpg')
      },
      {
        title: '«Психодинамический подход в консультировании» - 108 ч., г. Смоленск, 2020г. ',
        document: 'удостоверение',
        image: useAssetImage('/images/documents/psihodinamicheskij_podhod_v_konsultirovanii.jpg')
      },
      {
        title: '«Теория и практика психологического консультирования в сексологии» - 144 ч., г. Смоленск, 2020 г.',
        document: 'удостоверение',
        image: useAssetImage('/images/documents/teorija_i_praktika_psihologicheskogo_konsultirovanija_v_seksologii.jpg')
      }
    ]
  },
  {
    title: 'Конференции',
    items: [
      {
        title: 'II Практическая онлайн-конференция «Границы «Я»: от созависимости к сепарации. Тактика психологической работы», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/granicy_ja_ot_sozovisimosti_k_separacii.jpg')
      },
      {
        title: 'II Практическая онлайн-конференция «Работа психолога с деструктивными эмоциями в контексте современной реальности», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/konferencija_rabota_s_distruktivnymi_jemocijami.jpg')
      },
      {
        title: 'II Практическая онлайн-конференция «Женско-мужские отношения: работа психолога с актуальными запросами», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/konferencija_zhensko_muzhskie_otnoshenija.jpg')
      }
    ]
  },
  {
    title: 'Вебинары',
    items: [
      {
        title: '«Исцеление фрагментов «Я» переживших травму», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/iscelenie_fragmentov_ja.jpg')
      },
      {
        title: '«Ресурсирование как этап работы с травматическим опытом», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/resursirovanie_rabota_s_travmoj.jpg')
      },
      {
        title: '«Роли жертвы и агрессора поле психической травмы», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/roli_zhertvy_i_agressora.jpg')
      },
      {
        title: '«Невроз и травма. Причины и психотерапия», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/nevroz_i_travma.jpg')
      },
      {
        title: '«Неврозы. Диагностика, профилактика и психокоррекция», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/nevrozy_diagnostika_profilaktika.jpg')
      },
      {
        title: '«Работа психолога с последствиями непрожитого горя», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/rabota_psihologa_s_posledstvijami_neprozhitogo_gorja.jpg')
      },
      {
        title: '«Мотивационное интервью как часть КПТ клиентов с РПП», г. Москва, 2024г.',
        document: 'сертификат',
        image: useAssetImage('/images/documents/motivacionnoe_intervju_kak_chast_kpt_klientov_s_rpp.jpg')
      }
    ]
  }
]

const onShowDocument = (image: string) => {
  const { open } = useModal({
    component: UiImageViewer,
    attrs: {
      image
    }
  })
  open()
}
// import type ModalEducationSlider from '@/components/ui/modals/ModalEducationSlider.vue'
// import EducationSlider from '@/components/ui/Slider/EducationSlider.vue'

// const isShowModalEducationSlider = ref(false)
// const ModalEducationSliderRef = ref<InstanceType<typeof ModalEducationSlider> | null>(null)

// const handleSlideClick = (index: number) => {
//   isShowModalEducationSlider.value = true

//   if (ModalEducationSliderRef.value) {
//     ModalEducationSliderRef.value.goToSlide(index)
//   }
// }
</script>

<style lang="scss" scoped>
.education-section {
  padding: 0 $content-padding;

  .title {
    text-align: center;

    @media screen and (min-width: $md) {
      text-align: left;
    }
  }
}
</style>
