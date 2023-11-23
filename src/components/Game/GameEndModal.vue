<template>
	<div class="modal-wrapper">
		<div class="modal" :class="victory ? 'victory' : 'game-over'">
			<div class="header">
				<span class="title">
					{{ victory ? "VICTORY!" : "GAME OVER" }}
				</span>
				<span class="subtitle">
					{{ victory ? "You've matched all pairs in time!" : "Time has run out!" }}
				</span>
			</div>

			<div class="body">
				<span>You matched {{Math.abs(remainingPairs - totalPairs)}} out of {{ totalPairs }} pairs in {{revealCount}} tries.</span>
			</div>

			<div class="footer">
				<Button :link="{name: 'home'}" color="silver">CHANGE DIFFICULTY</Button>
				<Button :link="{}" color="gold">
					{{ victory ? "PLAY AGAIN!" : "TRY AGAIN!" }}
				</Button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:['victory', 'remainingPairs','totalPairs', 'revealCount']
};
</script>