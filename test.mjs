import test from'node:test';import assert from'node:assert/strict';import{normalizeEntries,inspect}from'./rpc.mjs';import{createServer}from'./index.mjs';
const manifest=[{id:'code',label:'Code',kind:'code',keyXdr:'public-key',dependsOn:[]}];
test('omitted entry is missing, never archived',()=>assert.equal(normalizeEntries(manifest,{latestLedger:100,entries:[]})[0].state,'missing'));
test('valid live TTL retained',()=>assert.equal(normalizeEntries(manifest,{latestLedger:100,entries:[{key:'public-key',liveUntilLedgerSeq:110}]})[0].liveUntilLedger,110));
test('missing TTL cannot establish live state',()=>assert.equal(normalizeEntries(manifest,{latestLedger:100,entries:[{key:'public-key'}]})[0].state,'missing'));
test('wrong network rejected before inventory read',async()=>{let calls=0;await assert.rejects(inspect(manifest,async()=>{calls++;return{ok:true,json:async()=>({result:{passphrase:'Public network'}})}}),/Wrong network/);assert.equal(calls,1)});
test('duplicate keys rejected',async()=>await assert.rejects(inspect([...manifest,...manifest]),/Duplicate/));
test('HTTP plan rejects untrusted origin',async()=>{let s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));try{let r=await fetch(`http://127.0.0.1:${s.address().port}/example`,{headers:{origin:'https://example.com'}});assert.equal(r.status,403)}finally{s.closeAllConnections();await new Promise(r=>s.close(r))}});
