<template>
	<div class="card-wrap" :class="{matched: matched}">
		<div
			:class="{'is-flipped': isFlipped}"
			class="card"
			@click="flip"
		>
			<div class="card-face front" :class="id"></div>
			<div class="card-face back"></div>
		</div>
	</div>
</template>

<script>
import EventBus from "@/EventBus";
export default {
	props: ['id'],
	data() {
		return {
			isFlipped: false,
			matched: false,
		}
	},

	methods: {
		flip(){
			this.isFlipped = !this.isFlipped;
			EventBus.$emit('card_flipped', this.id);
		},

		onCardChecked({cardIds, matched}){
			if(cardIds.includes(this.id)){
				this.matched = matched;
				if(!matched){
					this.isFlipped = false;
				}
			}
		}
	},

	mounted(){
		EventBus.$on('cards_checked', this.onCardChecked);
	},

	beforeDestroy() {
		EventBus.$off("card_flipped");
	},
};
</script>