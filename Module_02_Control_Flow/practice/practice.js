function testRestAndNumberReuce(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}

console.log(testRestAndNumberReuce(1, 2, 4, 3, 5));
