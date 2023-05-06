<template>
	<view class="safe-footer">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"safe-footer",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.safe-footer{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
