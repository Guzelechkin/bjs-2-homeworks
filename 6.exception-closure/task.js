﻿'use strict'

function parseCount(value) {
	const parsedValue = Number.parseFloat(value);
	if (Number.isNaN(parsedValue)) {
		throw new Error('Невалидное значение');
	}
	return parsedValue;
}


function validateCount(value) {
	try {
		const parsedValue = parseCount(value);
		return parsedValue;
	} catch (error) {
		return error;
	}
}

class Triangle {
	constructor(a, b, c) {
		if ((a + b <= c) || (a + c <= b) || (b + c <= a)) {
			throw new Error('Треугольник с такими сторонами не существует');
		}

		this.a = a;
		this.b = b;
		this.c = c;
	}
	get perimeter() {
		return this.a + this.b + this.c;
	}
	get area() {
		const p = this.perimeter / 2;
		const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
		return +area.toFixed(3);
	}
}

function getTriangle(a, b, c) {
	try {
		return new Triangle(a, b, c);
	} catch (e) {
		return {
			get perimeter() {
				return 'Ошибка! Треугольник не существует';
			},
			get area() {
				return 'Ошибка! Треугольник не существует';
			}
		};
	}
}