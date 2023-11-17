<template>
	<div id="home">
		<header>
			<img src="@/assets/img/logo.png" alt="hearthstone memory game"/>
		</header>

		<div class="subtitle">Choose difficulty:</div>
		<ul>
			<li>
				<Button :link="{name:'game', params: {difficulty: 'easy'}}" color="silver">EASY</Button>
			</li>
			<li>
				<Button :link="{name:'game', params: {difficulty: 'medium'}}" color="pink">MEDIUM</Button>
			</li>
			<li>
				<Button :link="{name:'game', params: {difficulty: 'hard'}}" color="gold">HARD</Button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	//
};
</script>

<style lang="scss">

	#home{
		header{
			display: flex;
			justify-content: center;
			padding: 0 10px;

			img{
				width:100%;
				max-width: 550px;
			}
		}

		.subtitle{
			text-align: center;
			font-size: 32px;
			margin-top:20px;
		}

		ul{
			list-style: none;
			display: flex;
			flex-flow: wrap;
			justify-content: center;

			li{
				margin:10px 2%;

				.hs-border{
					min-width: 120px;
				}
			}
		}
	}

</style>