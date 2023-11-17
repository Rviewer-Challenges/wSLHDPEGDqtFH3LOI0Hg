<template>
	<div id="board" :class="difficulty">
		<header>
			<div class="header-wrapper">
				<div class="reveals">
					<p>Reveals</p>
					<span>{{ revealCount }}</span>
				</div>
				<div class="timer">
					<p>Time</p>
					<span>{{ secondsLeft }}</span>
				</div>
				<div class="remaining">
					<p>Remaining pairs</p>
					<span>{{ remainingPairs }}</span>
				</div>
				<div @click="changeDifficulty" class="change-difficulty">
					<Button class="gold">
						Change difficulty
					</Button>
				</div>
			</div>
		</header>

		<ul :class="{blocked: blocked}">
			<li v-for="(cardId, index) in deck" :key="cardId+index">
				<Card :id="cardId"/>
			</li>
		</ul>

		<GameEndModal
			v-if="gameEnded"
			:victory="victory"
			:remaining-pairs="remainingPairs"
			:total-pairs="difficulties[difficulty]"
			:reveal-count="revealCount"
		></GameEndModal>
	</div>
</template>

<script>
import EventBus from "@/EventBus";
import Utils from "@/Utils";

export default {
	props: ['difficulty'],
	data() {
		return {
			cardIdOnPlay: null,
			difficulties: {
				easy: 8,
				medium: 12,
				hard: 15,
			},
			blocked: false,
			cardPool: [
				'bananas', 'blade_flurry', 'brawl', 'dream', 'equality', 'explosive_trap', 'eye_beam', 'feral_spirit',
				'nightmare', 'pyroblast', 'runeforging', 'silence', 'twisting_nether', 'wrath', 'ysera_awakens'
			],
			deck: [],
			revealCount: 0,
			remainingPairs: null,
			intervalId: null,
			secondsLeft: 60,
			gameEnded: false,
			victory: false,
		}
	},

	methods: {
		checkFlippedCard(cardId) {
			this.startCountdown();
			if(this.cardIdOnPlay !== null){
				this.blocked = true;
				this.revealCount++;
				const cardsMatched = cardId === this.cardIdOnPlay;
				setTimeout(()=>{
					this.blocked = false;

					EventBus.$emit('cards_checked', {
						cardIds: [cardId, this.cardIdOnPlay],
						matched: cardsMatched
					});

					this.cardIdOnPlay = null;

					if(cardsMatched) {
						this.remainingPairs--;
						if(this.remainingPairs === 0){
							this.stopCountdown();
							this.gameEnded = true;
							this.victory = true;
						}
					}
				}, 1000);
			}else{
				this.cardIdOnPlay = cardId;
			}
		},

		startCountdown(){
			if(this.intervalId === null){
				this.intervalId = setInterval(()=>{
					this.secondsLeft--;
					if(this.secondsLeft === 0){
						this.gameOver();
					}
				}, 1000);
			}
		},

		stopCountdown(){
			if(this.intervalId !== null) {
				clearInterval(this.intervalId);
				this.intervalId = null;
			}
		},

		changeDifficulty(){
			this.stopCountdown();
			this.$router.push({name: 'home'});
		},

		gameOver(){
			this.stopCountdown();
			this.blocked = true;
			this.gameEnded = true;
			this.victory = false;
		}
	},

	mounted(){
		EventBus.$on('card_flipped', this.checkFlippedCard);

		this.remainingPairs = this.difficulties[this.difficulty];

		this.cardPool = Utils.shuffle(this.cardPool);
		const removedCardsFromPool = this.cardPool.length - this.remainingPairs;
		for(let c = 0; c < removedCardsFromPool; c++){
			this.cardPool.pop();
		}

		this.deck = Utils.shuffle(
			this.deck.concat(this.cardPool, this.cardPool)
		);
	},

	beforeDestroy() {
		EventBus.$off("card_flipped");
	},
};
</script>

<style lang="scss">
	#board{
		display: flex;
		justify-content: center;

		header{
			background: rgb(66 66 66 / 95%);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 60px;
			z-index: 100;
			color: white;
			box-shadow: 0 3px 20px #0000007d;
			border-bottom: 3px solid rgb(0 0 0 / 46%);
		}

		.header-wrapper{
			display: flex;
			justify-content: center;
			align-items: center;
			height:100%;
			position: relative;

			> div{
				width: 46%;
				span{
					font-size: 22px;
				}
			}

			.reveals{
				display: flex;
				flex-direction: column;
				align-items: flex-end;
			}

			.timer{
				display: flex;
				width: 8%;
				min-width: 80px;
				max-width: 100px;
				flex-direction: column;
				align-items: center;
				line-height: 1;

				span{
					font-size: 34px;
				}
			}

			.change-difficulty{
				position: absolute;
				right: 2%;
				display: inline;
				width: auto;

				.hs-text{
					font-size: 12px;
				}
			}
		}

		ul{
			list-style: none;
			display: flex;
			flex-flow: wrap;
			justify-content: center;
			margin-top: 70px;
			padding: 0;
			max-width: 1000px;

			&.blocked{
				pointer-events: none;
			}

			li{
				margin-bottom: -4px;
			}
		}

		&.easy ul{
			max-width: 720px;
		}
	}
</style>