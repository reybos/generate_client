Run commands in root
```
npm install
npm run build

which node (it return your node location)
```

Add mcp server to your agent config
```
{
    "mcpServers": {
        "get_doc": {
            "command": "/opt/homebrew/opt/node@20/bin/node",
            "args": [
                "/Users/andrejbosyj/Documents/projects/mcp-servers/generate_client_new/build/index.js"
            ]
        }
    }
}
```
Where 
command - node full path
args - path to your built js file