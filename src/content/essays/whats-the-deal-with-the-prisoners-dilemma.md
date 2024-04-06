---
title: What’s the Deal with the Prisoner’s Dilemma?
lastUpdatedDate: 2024-04-06
description: Why the Prisoner’s Dilemma is important
---

The Prisoner’s Dilemma is often trotted out when discussing game theory, but in popular treatments I rarely see an explanation of *why* it’s important mathematically. Let’s change that 😃

## But First, Some Definitions

In game theory, we study **games**, which have a rather *broader* definition than we normally mean in English. Games in game theory encompass any situation (competitive or cooperative) where two or more **players** have to pick between different **strategies**, resulting in **payoffs** depending on what strategies the other players pick. We’ll call a set of strategies and their associated payoffs a **game state**. There is a general (but not universal) assumption in game theory that players are trying to maximize their own payoff.

This is a **very** broad definition — games in game theory could be anything from voters (players) choosing who to vote for (strategies) based on their preferences (payoff), to animals (players) choosing how to pick mates (strategies) for the greatest reproductive success (payoffs). This broadness is perhaps why some folks on the Internet are so quick to apply game theory... but we must remember that game theory is just a  model, and every model is wrong, but useful 😉

Often, two-player games are analyzed in the form of a matrix, like so:

|  | P1S1 | P1S2 | P1S3 |
|:--|:--|:--|:--|
| P2S1  | (3,1)  | (2,2)  | (-1,1) |
| P2S2  | (-7,9) | (2,3)  | (11,10)  |
| P2S3 | (8,10)  | (-1,-1)  | (1,1)  |

To find the payoffs for a particular set of strategies, we go to the cell labeled by each player’s strategy. So, for instance, if player 1 picks strategy 2 and player 2 picks strategy 2, then player 1 gets 2 “points” as payoff and player 2 gets 3 “points”. (What exactly these “points” are is itself a complicated topic, and depends on what’s being modeled, but generally you can assume it’s a monetary value that the player places on that outcome. If you’re interested, look up utility in decision theory.)

Now there’s two particularly interesting properties a game state can have.

The first one is **Pareto optimality**. A game state is Pareto optimal if there’s no way to improve a player’s payoff without hurting another player. For example, in the game matrix above, (11,10) is a Pareto optimal point — if either player switches their strategy, the other player’s payoff will be lowered! On the other hand, (8,10) is *not* a Pareto optimal state — if player 1 switches to strategy 3 and player 2 switches to strategy 2, player 1 would have a higher payoff and player 2 would keep their payoff!

One way to think about Pareto optimality is as a “fair” game state. Alternatively, we can think about a non-Pareto optimal state as inefficient — in that case, there’s some other game state we could get to where at least one player has some “free” value.

The other property is being a **Nash[^nash] equilibrium**, or a stable state. In a Nash equilibrium, no player has an incentive to change strategies, if they assume other players are not changing their strategies. So, in the game above, (11,10) is a Nash equilibrium; neither players wants to change strategies, because it would just lower their payoff! However, (2,2) is not a Nash equilibrium; if player 2 sticks to strategy 1, then player 1 can do better by switching to strategy 1. Since player 1 wants to maximize their payoff, they’ll switch to strategy 1 as soon as they’re able. But, of course, player 2 can then do better by switching to strategy 2... Do note, however, that in this game (8,10) is *also* a stable state; there can be multiple Nash equilibria!

In an unstable state, players are incentivized to change strategies, until they hit a Nash equilibrium and get “stuck” there. In other words, Nash equilibria are, in some sense, “solutions” to the game — the states it will “naturally” end up in.

## The Big Idea

Now we can finally get to the main idea:

**Is every Pareto optimal state also a Nash equilibrium?**

If this were true, we would live in a very nice world. As soon as players end up in a fair, efficient state, then everybody is happy and has no incentive to switch strategies, because it’s also a stable state!

Intuitively, you might even think the statement is true. After all, if I switch to a strategy that lowers your payoff, then you could switch to a strategy that harms my payoff. So, since a Pareto optimal state is the best we can both do without harming the other, we might as well stay in it.

Unfortunately, it’s possible to define games where the Pareto-optimal states are *not* stable — games where players have incentives to change their strategy, even though they’re already in a “fair” state. The Prisoner’s Dilemma is important because it’s the simplest counterexample to that very nice, but false, idea.

## The Prisoner’s Dilemma

The Prisoner’s Dilemma is usually presented something like this:

> A sheriff’s office has arrested two criminals, Olaf and Esmé. They don’t have enough evidence to convict them of murder; they need at least one of the criminals to testify against the other. However, they do have enough evidence to convict them of arson. The two criminals are held in separate cells and not allowed to communicate. The sheriff goes to each of them and offers them this deal: if you testify against your conspirator, we’ll convict your conspirator and let you off as an informant. However, if you **both** testify against each other, we’ll convict you both, but give you reduced sentences for being cooperative. Have fun!

Traditionally, the two options given to the prisoners are called Cooperate (C) and Defect (D). Confusingly, cooperate doesn’t mean cooperating with the authorities; it refers to cooperating with the other criminal! So the game looks something like this:

- If both criminals cooperate, they’ll be convicted of arson and serve a prison sentence of 1 year.
- If one of the criminals cooperates and the other defects, the criminal that defects will get away with no prison time, but the criminal that cooperates will be convicted with a full 3 year sentence.
- If both criminals defect, they’ll both be convicted, but serve a reduced sentence of 2 years.

We’ll assume both players want to selfishly minimize their *own* jail time.[^olaf]

Or, in matrix form (note that here we want to *minimize* the payoff, unlike the matrix above!)[^utility]:

|  | P1C | P1D |
|:--|:--|:--|
| P2C | (1,1)  | (0,3)  |
| P2D | (3,0)  | (2,2)  |

Intuitively, the “best” solution is for both players to cooperate, and indeed that is a Pareto optimal solution — if either of them defects to get a better deal, it will by definition hurt the other player, compared to the case where they both cooperate. Interestingly, the cases where only one player cooperates are also Pareto optimal. However, the case where they both defect is definitely *not* Pareto optimal — they can *both* do better by switching to cooperate together!

Unfortunately, the case where both players defect is the only Nash equilibrium in this game. Defecting is *always* a better option for each player, regardless of what the other player chooses. If P2 is cooperating, then P1 can get away with the crime completely by defecting. On the other hand, if P2 is defecting, P1 is going to take the full burden of the punishment, but they can lower their own punishment by also defecting. Hence, they are both incentivized to defect. Thus, the only Nash equilibrium is not Pareto optimal, and none of the Pareto optimal states are the Nash equilibrium.

## Wait, But What About...

You may have noticed we made a few assumptions in the definition of the Prisoner’s Dilemma. What if one player is altruistic and takes the blame for the whole crime? What if the players knew they were going to be faced with this choice and coordinated on a plan beforehand?

Perhaps those cases are more realistic, but then you’re no longer playing the classic Prisoner’s Dilemma!

That said, many of these extensions are themselves well-studied games in game theory. For instance, we might consider what happens if the two players have to play the Prisoner’s Dilemma repeatedly. In that case, one of the most effective strategies is actually the cooperative [tit-for-tat](https://en.wikipedia.org/wiki/Tit_for_tat#): if your opponent cooperates, you should cooperate as well, but if you opponent defects, punish them by defecting!

In any case, the main point stands: there are at least some conceivable situations where the fair, Pareto-optimal solution and the stable, Nash equilibrium solution are *not* the same.

## References

-  “Strategic-form games”, *Game Theory*, Maschler, Solan, and Zamir
-  “Dominance and best response”, *Strategy: An Introduction to Game Theory*, Joel Watson

[^nash]: It’s named after John Nash, aka the *A Beautiful Mind* guy, because he proved every competitive game has at least one Nash equilibrium, although players might have to adopt a “mixed strategy” where they partially randomize their choice of strategy.
[^olaf]: That feels like a pretty safe assumption in the case of Olaf and Esmé.
[^utility]: In most presentations, we would map jail sentences to a “utility”, where a lower jail sentence corresponds to a higher utility. Then, each player would try to maximize their utility as payoff. That makes the formal mathematics a bit clearer, but in a more intuitive introduction like this, it just introduces an extra layer of confusing abstraction.