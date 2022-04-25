## 遇到问题：
* 主节点自动后报错："NotYetInitialized: Replication has not yet been configured"
  解决：通过命令行连接主节点数据库：`mongo ip:port`，登录进去后执行：`rs.initiate()`
  或者：
  ```javascript
  rs.initiate({  _id:"rstest", // replSet指定的名称
    members:[{
      _id:0, host:"127.0.0.1:27017" // 主节点ip与端口
    }]
  })
  ```
  添加其他子节点：
  ```javascript
  rs.add("127.0.0.1:27018")
  rs.add("127.0.0.1:27019")
  ```
* 子节点启动失败，是因为数据库文件夹（`--dbpath`指定）不存在，或者权限不够。

## Install MongoDB with HomeBrew
`brew tap mongodb/brew`
`brew install mongodb-community@4.4`
