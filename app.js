const form=document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=>{
e.preventDefault();
if(upd){
    clearTimeout(upd);
}
const ctype=form.elements.coinType.value;
fetchPrice(ctype);

});
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ',' + hour + ':' + min + ':' + sec ;
    return time;
  }
const fetchPrice=async(ctype)=>{
    const r=await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`)
    const price=r.data.ticker.price;
    const volume=r.data.ticker.volume;
    const change=r.data.ticker.change;
    const base=r.data.ticker.base;
    const target=r.data.ticker.target;
    const time=timeConverter(r.data.timestamp);
    res.innerHTML=`<tr style="background-color:blue;color:white;font-weight:700">
    <td>PROPERTY</td>
    <td>VALUE</td>
</tr>
<tr>
    <td>${base}</td>
    <td >${price} ${target}</td>
</tr>
<tr>
    <td>volume</td>
    <td >${volume}</td>
</tr>
<tr>
    <td>CHANGE</td>
    <td >${change}</td>
</tr>
<tr>
    <td>LAST UPDATE</td>
    <td>${time}</td>
</tr>`
upd=setTimeout(()=>fetchPrice(ctype),10000);
}
