/// <reference path="Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {
    constructor(dungeon: string, amount: number) {
        super(amount, DefeatDungeonQuest.calcReward(dungeon, amount));
        this.description = `Defeat the ${dungeon} dungeon ${amount} times.`;
        this.questFocus = player.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeon)];
        this.createProgressObservables();
    }

    private static calcReward(dungeon: string, amount: number): number {
        let playerDamage = player.pokemonAttackObservable();
        let attacksToDefeatPokemon = Math.ceil(dungeonList[dungeon].baseHealth / playerDamage);
        //Average tiles till boss ~= 13
        return Math.ceil(attacksToDefeatPokemon * 13 * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER);
    }
}