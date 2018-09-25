import os
import shutil
import subprocess
import sys
srcDir=os.getcwd()
miR_dir='isomiR-SEA_db_21_test'
flag=0
while (flag == 0):
    path_miR_dir= os.path.join(os.path.sep, srcDir,miR_dir)
    if not os.path.exists(path_miR_dir):
        os.makedirs(path_miR_dir)
        flag = 1
    else:
        print('Existing path: '+ path_miR_dir)
        if sys.hexversion > 0x03000000:
            miR_dir = input('introduce a new path or type NO to abort ')
        else:
            miR_dir = raw_input('introduce a new path or type NO to abort ')
        if miR_dir.lower() in ('no', 'n'):
            sys.exit(0)

tag_location='tag_count' 
dbN=21 
path_tag= os.path.join(os.path.sep, srcDir, tag_location)
i=0
for file in os.listdir(srcDir):
    if file.endswith(".fa"):
        i=i+1
        mirbase_file=file
if i>1:
    print("too many .fa files: in this folder should be present an unque mirbase_mature fasta file")
    exit(-1)
mirbase_file_txt=mirbase_file.replace(".fa", ".txt")
for file in os.listdir(path_tag):
    if file.endswith(".txt"):
        new_folder_path= os.path.join(os.path.sep, path_miR_dir, file.replace(".txt", ""))
        os.makedirs(new_folder_path)
        shutil.copyfile(os.path.join(os.path.sep, path_tag, file), os.path.join(os.path.sep, new_folder_path, file.replace(".txt", "_tag.txt")))
        shutil.copyfile(os.path.join(os.path.sep, srcDir, mirbase_file), os.path.join(os.path.sep, new_folder_path, mirbase_file_txt))
os_flag='unknow'
from sys import platform as _platform
if _platform == "linux" or _platform == "linux2":
    print('linux')
    if 'x86_64' in str(subprocess.check_output(['uname', '-m'])):
        linux_os = str(subprocess.check_output(['uname', '-v']))
        if 'ubuntu' in linux_os.lower():
            print(subprocess.check_output(['uname', '-v']))
            print(subprocess.check_output(['uname', '-m']))
            os_flag='other_linux'
#            os_flag='ubuntu'
        else:
            os_flag='other_linux'
            print('Fedora or CentOS')
    else:
        print('Your x86 OS is not guaranted to be supported')
        os_flag='other_linux'
elif _platform == "darwin":
    if 'x86_64' in str(subprocess.check_output(['uname', '-m'])):
        os_flag='os_x'
        print('OS_X')
    else:
        print('Your x86 OS is not guaranted to be supported')
        os_flag='os_x'
elif _platform == "win32" or _platform == "cygwin":
    if '64' in str(subprocess.check_output(['wmic', 'os', 'get', 'osarchitecture'])):
        os_flag='windows64'
        print('Windows')
    else:
        print('Your x86 OS is not guaranted to be supported')
        os_flag='windows32' 
if os_flag != 'unknow':
    summary=''
    for x in os.listdir(path_miR_dir):
        if '.txt' not in x:
            for y in os.listdir(os.path.join(os.path.sep, path_miR_dir, x)):
                if '_tag.txt' in y:
                    for i in range(16, 17):
                        for j in range(4, 5):
                            test_folder_path=os.path.join(os.path.sep, path_miR_dir, x, "test_"+str(i)+"_"+str(j))
                            os.makedirs(test_folder_path)
                            if os_flag == 'ubuntu':
                                mir_sea_path=os.path.join(os.path.sep, srcDir, 'isomiR-SEA_OS', 'Ubuntu_14_04_2LTS_x86_64','isomiR-SEA_1_6')
                                mir_sea_run=mir_sea_path +" -s hsa -l " + str(i) + " -b " + str(j) + " -i " + os.path.join(os.path.sep, path_miR_dir, x, "") + " -p " +test_folder_path +" -ss 6 -h 11 -m mature_"+str(dbN)+" -t "+ y.replace(".txt", "")
                                os.system("echo $"+test_folder_path + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                                os.system(mir_sea_run + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                            elif os_flag == 'other_linux':
                                mir_sea_path=os.path.join(os.path.sep, srcDir, 'isomiR-SEA_OS', 'Debian_linux5_x86_64', 'isomiR-SEA_1_6')
                                mir_sea_run=mir_sea_path +" -s hsa -l " + str(i) + " -b " + str(j) + " -i " + os.path.join(os.path.sep, path_miR_dir, x, "") + " -p " +test_folder_path +" -ss 6 -h 11 -m mature_"+str(dbN)+" -t "+ y.replace(".txt", "")
                                os.system("echo $"+test_folder_path + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                                os.system(mir_sea_run + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                            elif os_flag == 'os_x':
                                mir_sea_path=os.path.join(os.path.sep, srcDir, 'isomiR-SEA_OS', 'Mac_OS_x86_64', 'isomiR-SEA_1_6')
                                mir_sea_run=mir_sea_path +" -s hsa -l " + str(i) + " -b " + str(j) + " -i " + os.path.join(os.path.sep, path_miR_dir, x, "") + " -p " +test_folder_path +" -ss 6 -h 11 -m mature_"+str(dbN)+" -t "+ y.replace(".txt", "")
                                os.system("echo $"+test_folder_path + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                                os.system(mir_sea_run + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                            elif os_flag == 'windows32':
                                mir_sea_path=os.path.join(os.path.sep, srcDir, 'isomiR-SEA_OS', 'Windows_x86_64_32bit', 'isomiR-SEA_1_6.exe')
                                mir_sea_run=mir_sea_path +" -s hsa -l " + str(i) + " -b " + str(j) + " -i " + os.path.join(os.path.sep, path_miR_dir, x, "") + " -p " +test_folder_path +" -ss 6 -h 11 -m mature_"+str(dbN)+" -t "+ y.replace(".txt", "")
                                os.system("echo $"+test_folder_path + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                                os.system(mir_sea_run + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                            elif os_flag == 'windows64':
                                mir_sea_path=os.path.join(os.path.sep, srcDir, 'isomiR-SEA_OS', 'Windows_x86_64_64bit', 'isomiR-SEA_1_6.exe')
                                mir_sea_run=mir_sea_path +" -s hsa -l " + str(i) + " -b " + str(j) + " -i " + os.path.join(os.path.sep, path_miR_dir, x, "") + " -p " +test_folder_path +" -ss 6 -h 11 -m mature_"+str(dbN)+" -t "+ y.replace(".txt", "")
                                os.system("echo $"+test_folder_path + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                                os.system(mir_sea_run + " >> "+ os.path.join(os.path.sep, path_miR_dir, 'summary.txt'))
                            os.remove(os.path.join(os.path.sep, test_folder_path ,"mature_"+str(dbN)+"_db_group_sorted.txt"))
                            os.remove(os.path.join(os.path.sep, test_folder_path ,"mature_"+str(dbN)+"_db_group.txt"))
                            os.remove(os.path.join(os.path.sep, path_miR_dir, x, "mature_"+str(dbN)+".txt"))
                            os.remove(os.path.join(os.path.sep, path_miR_dir, x, y))
