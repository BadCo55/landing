<script setup>
import { computed } from 'vue'
import { getAgeRecommendations } from '@/utils/inspectionRecommendations'
import Icon from './Icon.vue'
const props = defineProps({
  yearBuilt: { type: Number, default: null },
  intent: { type: String, default: '' },
  selected: { type: Object, required: true },
})
const emit = defineEmits(['toggle', 'info'])
const recommendations = computed(() =>
  getAgeRecommendations({ yearBuilt: props.yearBuilt, intent: props.intent }),
)
</script>
<template>
  <section
    v-if="recommendations.length"
    class="age-recommendations"
    aria-labelledby="age-recommendation-title"
  >
    <div class="age-recommendations-heading">
      <span class="age-year"><Icon name="home" />{{ yearBuilt }}</span>
      <div>
        <p class="quote-kicker">BASED ON YOUR PROPERTY’S AGE</p>
        <h3 id="age-recommendation-title">Worth a closer look.</h3>
      </div>
    </div>
    <p>
      These services may be relevant to your property. They’re optional, and nothing is added unless
      you choose it.
    </p>
    <div class="age-recommendation-list">
      <article
        v-for="item in recommendations"
        :key="item.key"
        :class="{ selected: selected[item.key] }"
      >
        <div>
          <span class="age-tag">{{ item.tag }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.reason }}</p>
          <p v-if="item.review" class="age-review-note">Scope and pricing confirmed by our team.</p>
        </div>
        <div class="age-actions">
          <button
            type="button"
            :aria-pressed="!!selected[item.key]"
            @click="emit('toggle', item.key)"
          >
            <Icon :name="selected[item.key] ? 'check' : 'plus'" />{{
              selected[item.key] ? 'Added to request' : 'Add to my request'
            }}</button
          ><button class="age-more" type="button" @click="emit('info', item.key)">
            About this service<Icon name="arrow" />
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
<style scoped>
.age-recommendations {
  border: 1px solid #d7e0e4;
  background: #f4f7f8;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 32px;
}
.age-recommendations-heading {
  display: flex;
  align-items: center;
  gap: 18px;
}
.age-year {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: #1e2b32;
  color: #fff;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
}
.age-recommendations h3 {
  font-size: 1.5rem;
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 7px 0 0;
}
.age-recommendations > p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: #5d6c77;
  margin: 20px 0;
}
.age-recommendation-list {
  display: grid;
  gap: 14px;
}
.age-recommendation-list article {
  background: #fff;
  border: 1px solid #dde4e8;
  border-radius: 12px;
  padding: 22px;
}
.age-recommendation-list article.selected {
  border-color: #b3453d;
}
.age-tag {
  font-size: 0.75rem;
  font-weight: 750;
  color: #6b7580;
}
.age-recommendation-list h4 {
  font-size: 1.1rem;
  line-height: 1.4;
  font-weight: 750;
  margin: 8px 0;
}
.age-recommendation-list p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #5d6c77;
}
.age-recommendation-list .age-review-note {
  margin-top: 12px;
  font-size: 0.875rem;
  font-weight: 650;
}
.age-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 18px;
}
.age-actions button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 750;
  padding: 10px 14px;
  border: 1px solid #d8dfe3;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  min-height: 44px;
}
.age-actions button[aria-pressed='true'] {
  background: #25373d;
  border-color: #25373d;
  color: #fff;
}
.age-actions .age-more {
  border: 0;
  padding-inline: 0;
  color: #5d6c77;
}
.age-actions .icon {
  width: 17px;
  height: 17px;
}
@media (max-width: 540px) {
  .age-recommendations {
    padding: 20px 16px;
  }
  .age-recommendations-heading {
    align-items: flex-start;
    gap: 12px;
  }
  .age-year {
    padding: 11px 9px;
    font-size: 0.875rem;
  }
  .age-year .icon {
    display: none;
  }
  .age-recommendations h3 {
    font-size: 1.4rem;
  }
  .age-recommendation-list article {
    padding: 18px;
  }
  .age-recommendations > p,
  .age-recommendation-list p {
    font-size: 1rem;
  }
  .age-actions button {
    font-size: 0.9375rem;
  }
}
</style>
