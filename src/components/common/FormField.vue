<script setup>
defineProps({
	id: String,
	label: String,
	type: {
		type: String,
		default: "text",
	},
	modelValue: String,
	isConfirmation: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <tr class="form-row">
    <th class="form-label-cell">
      <label :for="id" class="form-label">{{ label }}</label>
    </th>
    <td class="form-input-cell">
      <template v-if="!isConfirmation">
        <component
          :is="type === 'textarea' ? 'textarea' : 'input'"
          :id="id"
          :type="type"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="form-input"
          :class="{ 'form-textarea': type === 'textarea' }"
        />
      </template>
      <template v-else>
        <div class="form-confirmation-value">{{ modelValue }}</div>
      </template>
    </td>
  </tr>
</template>
