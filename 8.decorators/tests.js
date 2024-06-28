describe("Домашнее задание к занятию 8 «Функции декораторы»", () => {
  describe("Задача №1 Усовершенствованный кеширующий декоратор", () => {
    let add2 = (a, b) => a + b;
    let multiply3 = (a, b, c) => a * b * c;
    let upgAdd2;
    let upgMultiply3;


    beforeEach(function(){
      upgAdd2 = cachingDecoratorNew(add2);
      upgMultiply3 = cachingDecoratorNew(multiply3);
    });

    it("Декоратор кеширует", () => {
      expect(upgAdd2(1, 2)).toEqual("Вычисляем: 3");
      expect(upgAdd2(1, 2)).toEqual("Из кеша: 3");
      expect(upgAdd2(1, 2)).toEqual("Из кеша: 3");
    });

    it("Декоратор кеширует функцию 3х аргументов", () => {
      expect(upgMultiply3(2, 2, 3)).toEqual("Вычисляем: 12");
      expect(upgMultiply3(2, 2, 3)).toEqual("Из кеша: 12");
      expect(upgMultiply3(2, 2, 3)).toEqual("Из кеша: 12");
    });

    it("Декоратор кеширует только 5 значений", () => {
      expect(upgMultiply3(2, 2, 4)).toEqual("Вычисляем: 16"); // должно будет удалиться
      expect(upgMultiply3(2, 2, 5)).toEqual("Вычисляем: 20");
      expect(upgMultiply3(2, 2, 6)).toEqual("Вычисляем: 24");
      expect(upgMultiply3(2, 2, 7)).toEqual("Вычисляем: 28");
      expect(upgMultiply3(2, 2, 8)).toEqual("Вычисляем: 32");
      expect(upgMultiply3(2, 2, 8)).toEqual("Из кеша: 32");
      expect(upgMultiply3(2, 2, 3)).toEqual("Вычисляем: 12");
      expect(upgMultiply3(2, 2, 4)).toEqual("Вычисляем: 16"); // должно заново вычисляться
    });
  });

  describe("Задача №2 Усовершенствованный декоратор отложенного вызова", () => {
    
    it("Декоратор выполняет первый синхронный вызов функции", () => {
      let hasCalled = false;
      const functionToDecorate = () => {
        console.log("вызов дукорируемой функции");
        hasCalled = !hasCalled;
      }
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      decoratedFunction(1, 1);
      expect(hasCalled).toBe(true);
    });

    it("Декоратор выполнит второй вызов асинхронно функции", (done) => {
      let hasCalled = false;
      const functionToDecorate = () => {
        console.log("вызов дукорируемой функции");
        hasCalled = !hasCalled;
      }
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      decoratedFunction(2, 1);
      expect(hasCalled).toBe(true);

      decoratedFunction(2, 2);
      expect(hasCalled).toBe(true);

      setTimeout(() => {
        expect(hasCalled).toBe(false);
        done();
      }, 150);
    });

    it("Декоратор считает общее количество вызовов функции", () => {
      const functionToDecorate = () => console.log("вызов декорируемой функции");
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      decoratedFunction(3, 1);
      expect(decoratedFunction.allCount).toBe(0);

      decoratedFunction(3, 2);
      expect(decoratedFunction.allCount).toBe(1);
    });

    it("Декоратор считает количество вызовов переданной функции", (done) => {
      const functionToDecorate = () => console.log("вызов дукорируемой функции");
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      //expect(decoratedFunction.count).toBe(0);
      decoratedFunction(4, 1);
      expect(decoratedFunction.count).toBe(1);
  
      decoratedFunction(4, 2);
      expect(decoratedFunction.count).toBe(1);
  
      setTimeout(() => {
        decoratedFunction(4, 3);
        expect(decoratedFunction.count).toBe(2);
      }, 150);

      setTimeout(() => {
        decoratedFunction(4, 4);
        expect(decoratedFunction.count).toBe(2);
      }, 200);

      setTimeout(() => {
        decoratedFunction(4, 5);
        expect(decoratedFunction.count).toBe(3);
        expect(decoratedFunction.allCount).toBe(4);
        done();
      }, 400);
    });
  });
});