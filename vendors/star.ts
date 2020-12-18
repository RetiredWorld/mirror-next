const config: IConfig = {
    eleId: 'zk-star',
    wrapEleId: 'zk-background',
    bgColor: 'rgba(30,30,30,1)',
    starNum: 2e4,
    starColor: {
        r: [120, 255],
        g: [120, 255],
        b: [120, 255],
        a: [30, 100]
    },
    drawTimesDelay: 150,
    drawTimesSkip: 6,
    drawSpeed: 0.025,
    drawCoverColor: 'rgba(0,0,0,.035)'
}

function throttle(fn, threshold=1000) {
    let timer: NodeJS.Timeout | null;
    return function () {
        if (!timer) {
            timer = setTimeout(function (){
                fn();
                timer = null;
            }, threshold);
        }
    }
}

export class StarBackground {
    cvs: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    hidCvs: HTMLCanvasElement
    hidCtx: CanvasRenderingContext2D

    stars: IStar[] = []
    drawTimes: number = 0
    longSide: number
    reqId: number

    scrollCallback

    constructor() {
        // init variable
        this._init();

    }

    private _init() {

        // attain cvs
        this.cvs = document.getElementById(config.eleId) as HTMLCanvasElement;
        this.hidCvs = document.createElement("canvas");
        this.ctx = this.cvs.getContext('2d');
        this.hidCtx = this.hidCvs.getContext('2d');

        try {
            this.clearBefore();
        } catch (_) {}

        // calc width and height
        const cvsWidth = this.cvs.offsetWidth;
        const cvsHeight = this.cvs.offsetHeight;
        const longSide = Math.max(cvsWidth, cvsHeight);
        this.longSide = longSide;
        this.cvs.width = cvsWidth;
        this.cvs.height = cvsHeight;
        this.hidCvs.width = 2.4 * longSide;
        this.hidCvs.height = 2.4 * longSide;

        this.ctx.fillStyle = config.bgColor;
        this.ctx.fillRect(0, 0, cvsWidth, cvsHeight);
        this.ctx.lineCap = 'round';

        // create star
        for (let i=0; i < config.starNum; i++) {
            this.stars.push(this._createStar())
        }

        const centerX = cvsWidth;
        const centerY = 0;

        this.ctx.translate(centerX, centerY);
        this._drawStar();
        // this.scrollCallback =  this._observerScroll();
    }

    private _createStar(): IStar {
        const hidCvsHeight = this.hidCvs.height;
        const hidCvsWidth = this.hidCvs.width;

        return {
            x: StarBackground._rand(-hidCvsWidth, hidCvsWidth),
            y: StarBackground._rand(-hidCvsHeight, hidCvsHeight),
            size: 1,
            color: StarBackground._randColor(),
        }
    }

    private _drawStar() {
        for (let star of this.stars) {
            this.hidCtx.beginPath();
            this.hidCtx.arc(star.x, star.y, star.size, 0, 2 * Math.PI, true);
            this.hidCtx.fillStyle = star.color;
            this.hidCtx.closePath();
            this.hidCtx.fill();
        }
    }

    start() {
        cancelAnimationFrame(this.reqId);

        this.reqId = requestAnimationFrame(()=> {
            this.start.bind(this)()
        });
        this._tickHandler();
    }

    clearBefore() {
        cancelAnimationFrame(this.reqId);
        window.removeEventListener('scroll', this.scrollCallback);
        this.cvs.height = this.cvs.height;
        this.hidCvs.height = this.hidCvs.height;
    }

    private _drawFromCache() {
        this.ctx.drawImage(this.hidCvs, -this.hidCvs.width / 2, -this.hidCvs.height / 2);
    }

    private _tickHandler() {
        this._drawFromCache();
        this.drawTimes += 1;
        if (this.drawTimes < config.drawTimesDelay) {
        } else if ((this.drawTimes % config.drawTimesSkip) === 0){
            this.ctx.fillStyle = config.drawCoverColor;
            this.ctx.fillRect(-3 * this.longSide, -3 * this.longSide, 6 * this.longSide, 6 * this.longSide);
        }
        this._rotateCanvas(config.drawSpeed);
    }

    private _rotateCanvas(degree: number) {
        this.ctx.rotate(degree * Math.PI / 180);
    }

    private static _rand(fromNum: number, toNum: number): number {
        if (fromNum === toNum) return fromNum;

        const range = toNum - fromNum;
        return fromNum + Math.round(Math.random() * range);
    }

    private static _randColor(): string {
        const color = config.starColor;
        return `rgba(${StarBackground._rand(...color.r)},${StarBackground._rand(...color.g)},${StarBackground._rand(...color.b)},${StarBackground._rand(...color.a) / 100})`
    }

    private _observerScroll() {
        const scrollCallback = () => {
            const rootEle = document.getElementById(config.wrapEleId);
            if (document.documentElement.scrollTop > window.innerHeight * .7) {
                rootEle.classList.add('fixed');
            } else {
                rootEle.classList.remove('fixed');
            }
        };

        window.addEventListener('scroll', scrollCallback.bind(this))
        return scrollCallback;
    }
}

interface IStar {
    x: number
    y: number
    size: number
    color: string
}

interface IConfig {
    eleId: string
    wrapEleId: string
    bgColor: string
    starNum: number
    starColor: IStarColor

    drawTimesDelay: number
    drawTimesSkip: number
    drawSpeed: number
    drawCoverColor: string
}

interface IStarColor {
    [item: string]: [number, number]
}
