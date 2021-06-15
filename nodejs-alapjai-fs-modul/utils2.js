const {copyFile,unlink} = require('fs').promises

const copyFileWrapper = ({src,dest})=>{
    copyFile(src,dest)
}

const unlinkWrapper=async(path)=>{
    await unlink(path)
}
module.exports={
    copyFileWrapper,
    unlinkWrapper
}