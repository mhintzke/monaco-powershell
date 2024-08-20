
npm install

$info = Get-ComputerInfo

if($info.OsType -eq [Microsoft.PowerShell.Commands.OSType]::LINUX){
    npm run build:unix
}else{
    npm run build:win
}



if (!(Test-Path ./lib/PowerShellEditorServices)) {
    $tag = (Invoke-RestMethod https://api.github.com/repos/PowerShell/PowerShellEditorServices/releases/latest).tag_name
    Invoke-RestMethod -Uri "https://github.com/PowerShell/PowerShellEditorServices/releases/download/$tag/PowerShellEditorServices.zip" -OutFile PowerShellEditorServices.zip
    Expand-Archive PowerShellEditorServices.zip -DestinationPath lib
    Remove-Item ./PowerShellEditorServices.zip
}
