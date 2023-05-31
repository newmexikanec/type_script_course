/*function Logger(logStr: string) {
    return function (constructor: Function) {
        console.log(logStr);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookID: string) {
    return function<T extends {new(...args: any[]): {name: string}}>(origConstructor: T) {
        return class extends origConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookID);
                // const p = new origConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector(`h1`)!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My person Object</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating object..');
    }
}

const pers = new Person();

console.log(pers);*/
/*function Log(target: any, propertyName: string) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    @Log
    title: string;
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price');
        }
    }
    constructor(title: string, private _price: number) {
        this.title = title;
    }
    @Log3
    getPrice(@Log4 tax: number) {
        return this.price * (1 + tax);
    }
}

const p1 = new Product('Book 1', 19);
const p2 = new Product('Book 2', 29);*/

/*function Autobind(_: any,  _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };

    return adjDescriptor;
}
class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);*/
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid &&= !!obj[prop];
                    break;
                case 'positive':
                    isValid &&= obj[prop] > 0;
                    break;
            }
        }
    }

    return isValid;
}

class Course {
    @Required
    private title: string;
    @PositiveNumber
    private price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const form = document.querySelector('form')!;
form.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.querySelector('#title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        throw new Error('Invalid input');
        return;
    }

    console.log(createdCourse);
});
