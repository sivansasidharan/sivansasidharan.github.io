---
layout: post
category: blog
title: "Cluster Validation General/OS - HDP"
excerpt: "Cluster validation methodologies & checklist"
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

For every PS engagement that involves installation, upgrade, or migration, it is your responsibility to ensure that the installation validation checklist is completely executed.This will ensure:
- Proper configuration of the cluster
- Increased customer satisfaction
- Decreased volume to the Technical Support team

> The Importance of the Checklist
The installation validation checklist is a tool that you should refer to throughout the duration of your engagement.It was assembled by the Technical Support team and contains information and best practices gathered while working on multiple projects with multiple clients.The checklists provide information on key areas that you should focus on to ensure proper configuration of the components of your cluster. This will result in an operational Customer Environment.

#### General/OS Checklist Items
There are multiple items that should be checked to ensure that the General/OS functionality of the cluster is configured properly. The table below provides the key areas that you should focus on, along with the rationale behind them:

| **Checklist Item**                                                                                                               | **Notes/Rationale**                                                                                                                                                                           |
|----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Validate that the customer has some type of log/retention/archival/deletion process in place**                                 | Chron and the [*Log Archival Process Script*](https://raw.githubusercontent.com/dstreev/hdp-utils/master/operations/hdp-log-archive.sh) can be used to archive the HDP logs.                  |
| **Validate the cluster is set up with FQDNs**                                                                                    | This is important because Ambari uses FQDN internally. Use the command below to verify:hostname -f                                                                                            |
| **Validate that forward and Name resolution is set up consistently and is working as expected**                                  | This is critical for Ambari and can be potentially critical for HDFS.                                                                                                                         |
| **Validate that all installation pre-requisites are met, including OS umask 022 (iptables, selinux, name resolution, and ntpd)** | Ambari cannot handle iptables. As a result, you must disable them before installation. The iptables can be re-enabled after the installation has been completed with all needed ports opened. |
| **Validate that \* proxy hosts and users are setup properly in core-site.xml**                                                   |                                                                                                                                                                                               |
| **Validate that the mount is setup properly and uses the proper file system**                                                    | The recommended file system is XFS or EXT4. Refer to the [*HDP Tuning Document*](https://wiki.hortonworks.com/display/PS/DRAFT+-+HDP+Tuning) for mount options.                               |
| **Validate that Hive, Ambari, and Oozie Databases and local directories have enough space to grow**                              |                                                                                                                                                                                               |
| **Verify that user limits are set up with high enough numbers**                                                                  | Refer to the [*HDP Tuning Document*](https://wiki.hortonworks.com/display/PS/DRAFT+-+HDP+Tuning).                                                                                             |
| **Verify that all users are created consistently on all nodes**                                                                  | This is mandatory for HDFS and YARN functionality.                                                                                                                                            |
| **Verify that IPv6 and THP are disabled**                                                                                        | See next section in this topic.                                                                                                                                                               |
| **Verify that no custom jars are present in the system**                                                                         | Nodes should be cleanly re-imaged and not reused after manual cleaning.                                                                                                                       |
| **Verify that HDP init.d and other unsupported scripts are disabled and removed**                                                | Init.d scripts are supposed to be working and supported in HDP 2.2.                                                                                                                           |
| **Verify that all unsupported CDH and HDP 1.x configurations**                                                                   | Nodes should be cleanly re-imaged, not reused after manual cleaning.                                                                                                                          |
| **Verify that there are no dropped packets, network errors or overruns on interfaces**                                           |                                                                                                                                                                                               |
| **Verify that Rack Topology is set up**                                                                                          | Rack topology is important and should be set up as soon as possible after the cluster is initialized. If it is set up later, you will not be protected from Rack failures.                    |

#### Verifying that IPv6 and THP are disabled

Below are the steps required to disable THP. Please note that in the following instructions, defrag_file_pathname depends on the operating system:

- Red Hat/CentOS: /sys/kernel/mm/redhat_transparent_hugepage/defrag
- Ubuntu/Debian/OEL/SLES: /sys/kernel/mm/transparent_hugepage/defrag

To determine if transparent hugepage compaction is enabled, run the following commands and check the output:

{% highlight css %}
$ cat defrag_file_pathname
{% endhighlight %}

- [always] never means that transparent hugepage compaction is enabled
- always [never] means that transparent hugepage compaction is disabled


You can also disable transparent hugepage compaction interactively (the settings do not persist over a reboot).

To disable transparent hugepage compaction, add the following command to /ect/rc.local:

{% highlight css %}
echo never > defrag_file_pathname 
{% endhighlight %}

Use the following command to disable transparent hugepage compaction temporarily as root:

{% highlight css %}
echo 'never' > defrag_file_pathname 
{% endhighlight %}

Use the following command to disable transparent hugepage compaction temporarily using sudo:

{% highlight css %}
$ sudo sh -c "echo 'never' > defrag_file_pathname"
{% endhighlight %}

***
