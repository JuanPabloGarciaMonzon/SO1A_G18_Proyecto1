# Universidad de San Carlos de Guatemala
# Facultad de Ingeniería
# Escuela de Ciencias y Sistemas
# Sistemas Operativos 
# Proyecto 1 - Grupo #18
![texto_alternativo](https://i.pinimg.com/originals/e7/94/6c/e7946c7073fc9df995f6047d17125afe.png)


## Arquitectura
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/arquitectura.png)

## Tecnologías utilizadas

### Locust
 ![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/locust.png)
 
 
Generador de tráfico que en este caso es el encargado de recibir el JSON y enviarlo al balanceador de carga; está basado en Python. Este genera un archivo traffic.json. Se debe configurar el numero de usuarios totales, tasa de generación y su respectivo host. El archivo de la aplicación es traffic.py.


### Google Cloud Balancer
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/googleloadbalancer.png)


Google Cloud Balancer para manejar el flujo de datos que ingresa desde Locust a los diferentes servicios disponibles, 4 máquinas virtuales con diferentes intermediarios, como lo son:


### GRPC
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/grcp.png)


Tendremos un cliente y un servidor de GRPC programados en Go. Este sistema de llamada a un procedimiento remoto proporciona características como autenticación, transmisión bidireccional y control de flujo, entre otras cosas. 


### RabbitMQ
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/rabbitmq.png)

Es un sistema de mensajería no tan pesado, pero con muchas opciones disponibles para los usuarios, lo que hacen de este software una herramienta para tomar en cuanta en desarrollos donde se necesiten este tipo de soluciones.


### Nats
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/nats.png)

Es un software open-source de mensajería que actúa como una cola de mensajes distribuida para aplicaciones nativas en la nube.


### Google PubSub
![texto_alternativo](https://github.com/JuanPabloGarciaMonzon/SO1A_G18_Proyecto1/blob/main/images/maxresdefault.jpg)

Servicio de Google para mensajería asíncrona que se identifica por separar servicios que producen eventos de otros servicios que procesan eventos.

### Modulos de C
* Primero se crea un archivo de extensión .c donde se codifica en un formato que se pueda utilizar para convertirlo en un archivo .ko que se pueda montar en el Kernel.
* Luego se crea un archivo, sin extensión, llamado <b>Makefile</b>. Que nos servira para crear todo un entorno para montar nuestro archivo al Kernel.
* Se procede a usar el comando <b>"make all"</b> en la carpeta donde tengamos alojado tanto nuestro <b>"Makefile"</b> como nuestro <b>"archivo.c"</b>.
* Luego si todo esta correcto, se generaran una serie de archivos y el mas importante "archivo.ko".
* Luego usamos el comando <b>"sudo insmod archivo.ko"</b> para montar nuestro archivo al Kernel del S.O.
* Procedemos a ir a verificar a la carpeta <b>/proc</b> el archivo que creamos donde se despliega lo que mandamos a imprimir.

##### Comandos de interes para usar en terminal de Linux
```cpp
* make all
* sudo insmod ram_module.ko (montar en kernel)
* sudo rmmod ram_module (desmontar de kernel, NO SE PONE .ko)
```


##### Modulo de RAM (Makefile)
```cpp
obj-m += ram_module.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) 
modulesclean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
```
##### Modulo de RAM (ram_module.c)
```cpp
// SPDX-License-Identifier: GPL-2.0
#include <linux/fs.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/mm.h>
#include <linux/hugetlb.h>
#include <linux/mman.h>
#include <linux/mmzone.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/swap.h>
#include <linux/vmstat.h>
#include <linux/atomic.h>
#include <linux/vmalloc.h>
#include <asm/page.h>
#include <asm/pgtable.h>
#include <asm/uaccess.h>

#define FileProc "201222615_ram"

MODULE_AUTHOR("Juan Garcia");
MODULE_DESCRIPTION("SOPES 1");
MODULE_LICENSE("GPL");

struct sysinfo i;

unsigned long committed;
unsigned long allowed;
long cached;
unsigned long pages[NR_LRU_LISTS];
int lru;

static int show_memory_stat(struct seq_file *f, void *v){
    si_meminfo(&i);
	
    // seq_printf(f,"%lu\n",((i.freeram*100)/i.totalram));
    seq_printf(f,"{\n");
    seq_printf(f,"\"total\":" "%lu,\n", ((i.totalram) << (PAGE_SHIFT -10))/1024 );
    seq_printf(f,"\"free\":" "%lu,\n",( (i.freeram) << (PAGE_SHIFT -10) ) /1024);
    seq_printf(f,"\"used\":" "%lu,\n",(  ( ( ( (i.totalram) << (PAGE_SHIFT -10) )  -  ( (i.freeram) << (PAGE_SHIFT -10) ) )*4) /1024 ) );
    seq_printf(f,"\"percent\":" "%lu\n",(  (( ( ( (i.totalram) << (PAGE_SHIFT -10) )  -  ( (i.freeram) << (PAGE_SHIFT -10) ) )*4) /1024 )/100 ));
    
    seq_printf(f,"}\n");
    return 0;
}

static int meminfo_proc_open(struct inode *inode, struct file*file){
    return single_open(file,show_memory_stat, NULL);
}

static const struct file_operations Meminfo_fops = {
    .owner = THIS_MODULE,
    .open = meminfo_proc_open,
    .read = seq_read,
    .llseek  = seq_lseek,
	.release = seq_release
};


static int __init start_function(void){
    printk(KERN_INFO "Modulo RAM cargado");
    proc_create (FileProc, 0777, NULL, &Meminfo_fops);
	printk(KERN_INFO "Archivo Creado: /proc/%s\n",FileProc);
	return 0;
}

static void __exit clean_function(void){
    printk(KERN_INFO "Modulo RAM eliminado");
    remove_proc_entry(FileProc, NULL);
}

module_init(start_function);
module_exit(clean_function);
```

##### Modulo de Procesos (Makefile)
```cpp
obj-m += process_module.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) 
modulesclean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
```
##### Modulo de Procesos (process_module.c)
```cpp
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/uaccess.h>
#include <linux/slab.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>
#include <linux/sched/cputime.h>
#include <linux/cpumask.h>
#include <linux/interrupt.h>
#include <linux/kernel_stat.h>
#include <linux/time.h>
#include <linux/irqnr.h>
#include <linux/tick.h>


#ifndef arch_irq_stat_cpu
#define arch_irq_stat_cpu(cpu) 0
#endif
#ifndef arch_irq_stat
#define arch_irq_stat() 0
#endif

#ifdef arch_idle_time
static cputime64_t get_idle_time(int cpu)
{
	cputime64_t idle;

	idle = kcpustat_cpu(cpu).cpustat[CPUTIME_IDLE];
	if (cpu_online(cpu) && !nr_iowait_cpu(cpu))
		idle += arch_idle_time(cpu);
	return idle;
}

static cputime64_t get_iowait_time(int cpu)
{
	cputime64_t iowait;

	iowait = kcpustat_cpu(cpu).cpustat[CPUTIME_IOWAIT];
	if (cpu_online(cpu) && nr_iowait_cpu(cpu))
		iowait += arch_idle_time(cpu);
	return iowait;
}

#else

static u64 get_idle_time(int cpu)
{
	u64 idle, idle_time = -1ULL;

	if (cpu_online(cpu))
		idle_time = get_cpu_idle_time_us(cpu, NULL);

	if (idle_time == -1ULL)
		
		idle = kcpustat_cpu(cpu).cpustat[CPUTIME_IDLE];
	else
		idle = nsecs_to_jiffies64(idle_time);

	return idle;
}

static u64 get_iowait_time(int cpu)
{
	u64 iowait, iowait_time = -1ULL;

	if (cpu_online(cpu))
		iowait_time = get_cpu_iowait_time_us(cpu, NULL);

	if (iowait_time == -1ULL)

		iowait = kcpustat_cpu(cpu).cpustat[CPUTIME_IOWAIT];
	else
		iowait = nsecs_to_jiffies64(iowait_time);

	return iowait;
}
#endif


    static int meminfo_proc_show(struct seq_file *m, void *v){
        int contador_general = 0;
        int contador_run = 0;
        int contador_sleep = 0;
        int contador_stop = 0;
        int contador_zombie = 0;

        int i;
	    u64 user, nice, system, idle, iowait, irq, softirq, steal,NonIdle;
	    u64 prevuser, prevnice, prevsystem, previdle, previowait, previrq, prevsoftirq, prevsteal,prevNonIdle;


        user = nice = system = idle = iowait = 
        irq = softirq = steal = NonIdle = 0;

        prevuser = prevnice = prevsystem = previdle = previowait = 
        previrq = prevsoftirq = prevsteal = prevNonIdle = 0;

	for_each_possible_cpu(i) {
		user += kcpustat_cpu(i).cpustat[CPUTIME_USER];
		nice += kcpustat_cpu(i).cpustat[CPUTIME_NICE];
		system += kcpustat_cpu(i).cpustat[CPUTIME_SYSTEM];
		idle += get_idle_time(i);
		iowait += get_iowait_time(i);
		irq += kcpustat_cpu(i).cpustat[CPUTIME_IRQ];
		softirq += kcpustat_cpu(i).cpustat[CPUTIME_SOFTIRQ];
		steal += kcpustat_cpu(i).cpustat[CPUTIME_STEAL];
	}


    seq_printf(m,"{\"USAGE\" :[\n");
	seq_printf(m,"{\"user\":%llu,\"nice\":%llu,\"system\":%llu,\"idle\":%llu,\"iowait\":%llu,\"irq\":%llu,\"softirq\":%llu,\"steal\":%llu}],\n",
		jiffies_64_to_clock_t(user),
		jiffies_64_to_clock_t(nice),
		jiffies_64_to_clock_t(system),
		jiffies_64_to_clock_t(idle),
		jiffies_64_to_clock_t(iowait),
		jiffies_64_to_clock_t(irq),
		jiffies_64_to_clock_t(softirq),
		jiffies_64_to_clock_t(steal));


        struct task_struct *task;
 
        seq_printf(m," \"PROC\":[\n");
        for_each_process(task){
                 // struct list_head *list;
                //seq_printf(m,"{PROC_ID:%d,PROC_NAME:\"%s\",USER_ID:%d,ESTATE:",task->pid,task->comm,task->cred->uid);
			seq_printf(m,"{\"PROC_ID\":%d,\"PROC_NAME\":\"%s\",\"USER_ID\":%d,\"PARENT_ID\":%d,\"MEMORY\":%d,\"ESTATE\":",task->pid,task->comm,task->cred->uid, task->parent->pid,task->usage);
                switch(task->state){
                                case 0: seq_printf(m,"\"R\","); contador_run = contador_run + 1;
                                break;

                                case 1: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 2: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 4: seq_printf(m,"\"T\","); contador_stop = contador_stop + 1;
                                break;

                                case 8: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 32: seq_printf(m,"\"Z\","); contador_zombie = contador_zombie + 1;
                                break;

                                default: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                }

                                if(task->mm)
                                {
                                //seq_printf(m,"MEMORY_USED:%8lu},",task->mm->task_size);
                                seq_printf(m,"\"MEMORY_USED\":%8lu},",task->mm->mmap->vm_end - task->mm->mmap->vm_start);
                                }
                                else
                                {
                                 seq_printf(m,"\"MEMORY_USED\":0},");
                                }
                seq_printf(m,"\n");
                contador_general = contador_general +1;

        }
        seq_printf(m,"{\"PROC_ID\":3791,\"PROC_NAME\":\"server\",\"USER_ID\":1000,\"PARENT_ID\":3768,\"ESTATE\":\"R\",\"MEMORY_USED\": 2498560} \n]}");


        //imprime resumen de estadisticas de procesos
        //seq_printf(m,"{TOTAL=%d, RUN=%d, SLEEP=%d, STOPPED=%d, ZOMBIE=%d}",contador_general, contador_run, contador_sleep,contador_stop, co>
        
        return 0;
    }

    static void __exit final(void)
    {
         printk(KERN_INFO "PRIMER SEMESTRE.\r\n");
         remove_proc_entry("cpu_201222615", NULL);
    }

    static int meminfo_proc_open(struct inode *inode, struct file *file)
    {
        return single_open(file, meminfo_proc_show, NULL);
    }

    static const struct file_operations meminfo_proc_fops = {
        .owner      = THIS_MODULE,
        .open       = meminfo_proc_open,
        .read       = seq_read,
        .llseek     = seq_lseek,
        .release    = single_release,
    };

    static int __init inicio(void) //Escribe archivo en /proc
    {
        printk(KERN_INFO "NUMERO DE CARNET: 201222615.\r\n");
        proc_create("cpu_201222615", 0777, NULL, &meminfo_proc_fops);
        return 0;
    }


    module_init(inicio);
    module_exit(final);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Juan Garcia 201222615");
MODULE_DESCRIPTION("Monitor de Procesos");
MODULE_VERSION("1.0");
```

