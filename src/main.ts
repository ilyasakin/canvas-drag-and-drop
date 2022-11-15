import Game from './Game';
import './style.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 300;
canvas.height = 300;

const game: Game = new Game(canvas);

game.init();
