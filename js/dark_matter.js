// Costs Dark Matter
function canBuyDarkMatterShop(cost, currency = "dark_orbs") {
    return gameData[currency] >= cost && cost != Infinity
}

function buyDarkMatterShop(cost, key, currency = "dark_orbs", value = gameData.dark_matter_shop[key] + 1) {
    if (!canBuyDarkMatterShop(cost, currency)) return
    gameData[currency] -= cost
    gameData.dark_matter_shop[key] = value
}

function getDarkOrbGeneratorCost() {
    return 1 + 3 * gameData.dark_matter_shop.dark_orb_generator
}

function canBuyDarkOrbGenerator() {
    return canBuyDarkMatterShop(getDarkOrbGeneratorCost(), "dark_matter") && getDarkOrbGeneration() != Infinity
}


function buyDarkOrbGenerator() {
    if (canBuyDarkOrbGenerator()) buyDarkMatterShop(getDarkOrbGeneratorCost(), "dark_orb_generator", "dark_matter")
}

// Costs Dark Orbs
function getADealWithTheChairmanCost() {
    return Math.pow(1e3, gameData.dark_matter_shop.a_deal_with_the_chairman + 1)
}

function canBuyADealWithTheChairman() {
    return canBuyDarkMatterShop(getADealWithTheChairmanCost())
}

function buyADealWithTheChairman() {
    buyDarkMatterShop(getADealWithTheChairmanCost(), "a_deal_with_the_chairman")
}

function getAGiftFromGodCost() {
    return Math.pow(1e5, gameData.dark_matter_shop.a_gift_from_god + 1)
}

function canBuyAGiftFromGod() {
    return canBuyDarkMatterShop(getAGiftFromGodCost())
}

function buyAGiftFromGod() {
    buyDarkMatterShop(getAGiftFromGodCost(), "a_gift_from_god")
}

function getLifeCoachCost() {
    return Math.pow(1e10, gameData.dark_matter_shop.life_coach + 1)
}

function canBuyLifeCoach() {
    return canBuyDarkMatterShop(getLifeCoachCost())
}

function buyLifeCoach() {
    buyDarkMatterShop(getLifeCoachCost(), "life_coach")
}

function getGottaBeFastCost() {
    return Math.pow(5e7, gameData.dark_matter_shop.gotta_be_fast + 1)
}

function canBuyGottaBeFast() {
    return canBuyDarkMatterShop(getGottaBeFastCost())
}

function buyGottaBeFast() {
    buyDarkMatterShop(getGottaBeFastCost(), "gotta_be_fast")
}

// Rewards
function getDarkOrbGeneration() {
    if (gameData.dark_matter_shop.dark_orb_generator == 0) return 0

    const darkOrbiter = gameData.requirements["Dark Orbiter"].isCompleted() ? 1e10 : 1

    return Math.pow(100, gameData.dark_matter_shop.dark_orb_generator - 1) * darkOrbiter
}

function getTaaAndMagicXpGain() {
    if (gameData.active_challenge == "the_darkest_time") return 1

    return Math.pow(4, gameData.dark_matter_shop.a_deal_with_the_chairman)
}

function getAGiftFromGodEssenceGain() {
    if (gameData.active_challenge == "the_darkest_time") return 1

    return Math.pow(2.1, gameData.dark_matter_shop.a_gift_from_god)
}

function getLifeCoachIncomeGain() {
    if (gameData.active_challenge == "the_darkest_time") return 1

    return Math.pow(14, gameData.dark_matter_shop.life_coach)
}

function getGottaBeFastGain() {
    if (gameData.active_challenge == "the_darkest_time") return 1

    return 1 + 0.2 * gameData.dark_matter_shop.gotta_be_fast
}

function getAMiracleCost() {
    return 10
}

// Permanent unlocks
function canBuyAMiracle() {
    return getDarkMatter() >= getAMiracleCost()
}

function buyAMiracle() {
    if (canBuyAMiracle()) {
        buyDarkMatterShop(getAMiracleCost(), "a_miracle", "dark_matter", true)
    }
}


// Skill tree
function resetSkillTree() {
    if (gameData.dark_matter < 1e11 && confirm("Are you sure that you want to reset your Dark Matter Abilities?")
        || gameData.dark_matter >=1e11) {
        resetDarkMatterSkills()
        return true
    }
    return false
}

function resetDarkMatterSkills() {
    for (const key of darkMatterSkillNames) gameData.dark_matter_shop[key] = 0
}

function buySpeedOfLife(number) {
    buyDarkMatterSkill("speed_is_life", 100, number)   
}

function buyYourGreatestDebt(number) {
    buyDarkMatterSkill("your_greatest_debt", 1000, number)    
}

function buyEssenceCollector(number) {
    buyDarkMatterSkill("essence_collector", 10000, number)
}

function buyExplosionOfTheUniverse(number) {
    buyDarkMatterSkill("explosion_of_the_universe", 100000, number)
}

function buyMultiverseExplorer(number) {
    buyDarkMatterSkill("multiverse_explorer", 100000000, number)
}

function buyDarkMatterSkill(skill_name, cost, number) {
    if (gameData.dark_matter >= cost) {
        gameData.dark_matter -= cost

        if (gameData.dark_matter_shop[skill_name] == 0)
            gameData.dark_matter_shop[skill_name] = number
        else if (gameData.dark_matter_shop[skill_name] == 1 && (number == 2 || number == 3))
            gameData.dark_matter_shop[skill_name] = 3
        else if (gameData.dark_matter_shop[skill_name] == 2 && (number == 1 || number == 3))
            gameData.dark_matter_shop[skill_name] = 3
        else
            gameData.dark_matter += cost
    }
}

function getDarkMatterSkillIncome() {
    if (gameData.active_challenge == "the_darkest_time")
        return 0

    if (gameData.perks.positive_dark_mater_skills == 1)
        return 1

    let income = 1
    
    income *= [1, 3].includes(gameData.dark_matter_shop.your_greatest_debt) ? 0.1 : 1
    income *= [2, 3].includes(gameData.dark_matter_shop.your_greatest_debt) ? 0.5 : 1
    income *= [2, 3].includes(gameData.dark_matter_shop.essence_collector) ? 0.04 : 1
    income *= [2, 3].includes(gameData.dark_matter_shop.explosion_of_the_universe) ? 0.00001 : 1

    return income 

}

function getDarkMatterSkillTimeWarping() {
    if (gameData.active_challenge == "the_darkest_time")
        return 1

    let timewarping = 1

    timewarping *= [1, 3].includes(gameData.dark_matter_shop.speed_is_life) ? 3 : 1
    timewarping *= [2, 3].includes(gameData.dark_matter_shop.speed_is_life) ? 7 : 1
    timewarping *= [1, 3].includes(gameData.dark_matter_shop.multiverse_explorer) ?
        (gameData.perks.positive_dark_mater_skills == 1 ? 1 : 0.001) : 1

    return timewarping
}

function getDarkMatterSkillXP() {
    if (gameData.active_challenge == "the_darkest_time")
        return 1

    let xp = 1

    xp *= [1, 3].includes(gameData.dark_matter_shop.your_greatest_debt) ? 500 : 1
    xp *= [1, 3].includes(gameData.dark_matter_shop.explosion_of_the_universe) ? 1e100 : 1
    xp *= [2, 3].includes(gameData.dark_matter_shop.explosion_of_the_universe) ? 1e150 : 1

    return xp
}

function getDarkMatterSkillEssence() {
    if (gameData.active_challenge == "the_darkest_time")
        return 0.25

    let ess = 1

    ess *= (gameData.perks.positive_dark_mater_skills == 0 && [2, 3].includes(gameData.dark_matter_shop.speed_is_life)) ? 0.5 : 1
    ess *= (gameData.perks.positive_dark_mater_skills == 0 && [1, 3].includes(gameData.dark_matter_shop.explosion_of_the_universe)) ? 0.5 : 1

    ess *= [1, 3].includes(gameData.dark_matter_shop.essence_collector) ? 500 : 1
    ess *= [2, 3].includes(gameData.dark_matter_shop.essence_collector) ? 1000 : 1

    ess *= [1, 3].includes(gameData.dark_matter_shop.multiverse_explorer) ? 5000 : 1
    ess *= [2, 3].includes(gameData.dark_matter_shop.multiverse_explorer) ? 10000 : 1

    return ess
}

function getDarkMatterSkillEvil() {
    if (gameData.active_challenge == "the_darkest_time")
        return 0.25

    let evil = 1

    evil *= [2, 3].includes(gameData.dark_matter_shop.your_greatest_debt) ? 100 : 1
    evil *= (gameData.perks.positive_dark_mater_skills == 0 && [1, 3].includes(gameData.dark_matter_shop.speed_is_life)) ? 0.5 : 1
    evil *= (gameData.perks.positive_dark_mater_skills == 0 && [1, 3].includes(gameData.dark_matter_shop.essence_collector)) ? 0.5 : 1

    return evil
}
function getDarkMatterSkillDarkMater() {
    if (gameData.active_challenge == "the_darkest_time")
        return 1

    return (gameData.perks.positive_dark_mater_skills == 0 && [2, 3].includes(gameData.dark_matter_shop.multiverse_explorer)) ? 0.01 : 1
}
