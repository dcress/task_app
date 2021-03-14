<template>
	<label v-if="!hideLabel" :for="inputID">{{ name }} <span role="alert" v-if="hasErr" class="text-red-700">*Required</span></label>
	<input
		v-if="standardType"
		@input="$emit('updateValue', { value: $event.target.value, type: mapsTo })"
		:value="value"
		class="flex-1 w-full px-4 py-2 mt-1 text-base text-left text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
		:class="{ 'border-red-700': hasErr, 'text-center': centerInput }"
		:type="type"
		:placeholder="placeholder"
		:id="inputID"
		:aria-labelledby="labelID"
	/>
	<textarea
		v-else-if="type === 'textarea'"
		@input="$emit('updateValue', { value: $event.target.value, type: mapsTo })"
		:value="value"
		class="flex-1 w-full px-4 py-2 mt-1 text-base text-left text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
		:id="inputID"
		:class="{ 'border-red-700': hasErr }"
		:placeholder="placeholder"
		:aria-labelledby="labelID"
	></textarea>
	<input
		v-else-if="type === 'checkbox'"
		@change="$emit('updateValue', { value: $event.target.checked, type: mapsTo })"
		:checked="value"
		:type="type"
		class="mx-2"
		:id="inputID"
		:name="inputID"
		:aria-labelledby="labelID"
	/>
</template>

<script>
export default {
	emits: ['updateValue'],
	props: ['id', 'name', 'hasErr', 'placeholder', 'required', 'value', 'mapsTo', 'type', 'hideLabel', 'centerInput'],
	computed: {
		standardType() {
			return this.type === 'text' || this.type === 'date' || this.type === 'password';
		},
		inputID() {
			return `${this.mapsTo}_${this.id || ''}`;
		},
		labelID() {
			return `${this.inputID}_label`;
		},
	},
};
</script>
