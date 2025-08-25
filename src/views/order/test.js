let n=5
let candys=[1,1,3,4,6]
const myfun=(n,candys)=>{
let set=new Set()
for(let c of candys){
  if(c>0){
    set.add(c)
  }
}
return set.size
}
console.log(myfun(n,candys))