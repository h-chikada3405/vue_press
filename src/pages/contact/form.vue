<style lang="scss" scoped>
@use '@/assets/scss/pages/contact/form.scss';
</style>

<script setup>
import FormField from "@/components/common/FormField.vue";
import { reactive, ref } from "vue";

const isConfirmation = ref(false);
const formData = reactive({
	company: "",
	name: "",
	kana: "",
	mail: "",
	tel: "",
	zip: "",
	address: "",
	content: "",
});

const formFields = [
	{ id: "company", label: "会社名", type: "text" },
	{ id: "name", label: "お名前", type: "text" },
	{ id: "kana", label: "ふりがな", type: "text" },
	{ id: "mail", label: "メールアドレス", type: "email" },
	{ id: "tel", label: "お電話番号", type: "tel" },
	{ id: "zip", label: "郵便番号", type: "text" },
	{ id: "address", label: "住所", type: "text" },
	{ id: "content", label: "お問い合わせ内容", type: "textarea" },
];

const confirmForm = () => {
	isConfirmation.value = true;
};

const submitForm = async () => {
	console.log("submit");
};
</script>

<template>
  <div class="form">
    <div class="form-wrapper">

      <!-- 入力画面 -->
      <form v-if="!isConfirmation" @submit.prevent="confirmForm">
        <div class="form-container">
          <table class="form-table">
            <FormField
              v-for="field in formFields"
              :key="field.id"
              v-model="formData[field.id]"
              :id="field.id"
              :label="field.label"
              :type="field.type"
            />
          </table>
          <div class="form-policy">ご入力いただいた個人情報については<br>
            <router-link to="/contact/policy">個人情報保護方針（プライバシーポリシー）</router-link>に基づき取り扱います。
          </div>
        </div>
        <button type="submit" class="form-submit-button">入力内容を確認する</button>
      </form>

      <!-- 確認画面 -->
      <form v-else @submit.prevent="submitForm">
        <div class="form-container">
          <table class="form-table">
            <FormField
              v-for="field in formFields"
              :key="field.id"
              :id="field.id"
              :label="field.label"
              :modelValue="formData[field.id]"
              :isConfirmation="true"
            />
          </table>
        </div>
        <button @click.prevent="isConfirmation = false" class="form-back-button">入力画面に戻る</button>
        <button type="submit" class="form-submit-button">送信する</button>
      </form>

    </div>
  </div>
</template>
