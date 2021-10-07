# Difference between remix compile output and blockchain transaction input bytecode

- remix-ide compiled part:
        `dc42e2a2f3dbafcf33685dccc6db6e30dc2eeeb9b0720ec1db7e09c275e3412`
- blockchain bytecode:
        `3230123b82c930f1c67bc875788ef28e85d5d02b06bd0e2377eea8322371a8a`

What does this Difference mean?
It's actually not **bzzr1**.
Before these difference starts the ending trail is like this

`many many bytecodes...b50600083858161177857fe5b049594505050505056fea26469706673582212200` + `the different part`

So it's not swarm hash. Then what is this difference?
And how to just get bytecodes in all versions solidity if I only have source code files, not **metadata JSON** or **complete input JSON** with `javascript` not `python`?

# And remix-ide compilation does not give me constructor argument bytecodes even though blockchain bytecode has compilation bytecodes.

- Blockchain constructor argument bytecode
    `000000000000000000000000f491e7b69e4244ad4002bc14e878a34207e38c2900000000000000000000000077216b8c728097993e9ef0e1fe527fa4506fd6bc0000000000000000000000007416ccc4b26535ad0580f5bba0d4d237de8d9d52`
    
- Remix compilation bytecode

No result for compilation bytecode for constructor arguments
