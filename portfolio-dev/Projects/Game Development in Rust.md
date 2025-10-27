title: Game Development in Rust
subtitle: Study around SnakeBird
start_date: '2023-08-26'
end_date: '2023-12-29'
tech: rust, bevy
image_layout: featured
thumbnail: media/catsnake.png
github_url: https://github.com/oilandrust/cat-snake
live_url: https://oliver-rust.itch.io/cat-snake

A few projects of game development exploring gameplay inspired by the game SnakeBird.
I was attracted to learn Rust. I was drawn to its strong type system and elegant syntax.
Since making games was my strongest expertise, I played around with the Bevy game engine which I found really usable with an elegant component entity system.

I started with simple terminal games and then explored gameplay inspired by the game SnakeBird. What interested me about this game is that it has a grid logic, like the original snake game, but it also has smooth movement.
It's an interesting challenge since the game logic and state is in a discrete grid but we interpolate movements so it feels smooth.

I first implemented a clone of SnakeBird in 2D, replicating the same gameplay, including undo/redo and simple physics.
Two of the most interesting systems are the undo/redo system and the renderer used to render the snakes.

Then I extended this game to work in 3D, incorporating novel gameplay ideas on top of the SnakeBird gameplay.
