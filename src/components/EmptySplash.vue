<template>
	<div class="flex flex-col items-center w-full text-5xl text-center text-gray-300 min-h-15 font-extralight">
		<slot></slot>
		<DownArrow class="w-16 mt-10 ml-12" />
	</div>
</template>

<script>
import DownArrow from './icons/DownArrow';
export default {
	components: { DownArrow },
};
</script>
