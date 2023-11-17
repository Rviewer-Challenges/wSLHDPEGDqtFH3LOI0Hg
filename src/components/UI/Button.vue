<template>
	<div @click="go" class="hs-wrapper" :class="color">
		<span class="hs-button">
			<span class="hs-border">
				<span class="hs-text">
					<slot></slot>
				</span>
			</span>
		</span>
	</div>
</template>

<script>
export default {
	props:['color', 'link'],
	methods: {
		go(){
			if(this.link){
				this.$router.push(this.link).catch(err => {
					if(this.$route.path === err.to.path){
						window.location.reload();
					}
				});
			}
		}
	}
};
</script>