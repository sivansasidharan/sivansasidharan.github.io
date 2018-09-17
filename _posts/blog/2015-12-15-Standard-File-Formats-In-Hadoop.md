---
layout: post
category: blog
title: "Standard File Formats In Hadoop - Some Considerations"
excerpt: "Some considerations for storing standard file formats in Hadoop"
tags: [bigdata, hadoop, apache, hortonworks, datamodelling]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---
###Standard File Formats

One of the most powerful features of Hadoop is the ability to store all of your data regardless of format. Having access to data in its raw, source form —“full fidelity” data— means it will always be possible to perform new processing and analytics with the data as requirements change. But it’s preferable to use one of the Hadoop-specific container formats for storing data in Hadoop. 
Some considerations for storing standard file formats in Hadoop: 

> Text data

A very common use of Hadoop is the storage and analysis of logs such as web logs and server logs and also many other forms: CSV files, or unstructured data such as emails etc.

1. A primary consideration when you are storing text data in Hadoop is the organization of the files in the filesystem 
*Refer - [HDFS Schema Design](HDFS Schema Design)*


2. A compression format for the files needs to be selected, since text files can very quickly consume considerable space on your Hadoop cluster.
Selection of compression format will be influenced by how the data will be used.For archival purposes you may choose the most compact compression available, but if the data will be used in processing jobs such as MapReduce, you’ll likely want to select a splittable format. Splittable formats enable Hadoop to split files into chunks for processing, which is critical to efficient parallel processing.
*Refer - [Data Compression in Hadoop](http://sivansasidharan.me/blog/Data-Compression/)*


3. There is an overhead of type conversion associated with storing data in text format. 
For example, storing 1234 in a text file and using it as an integer requires a string-to-integer conversion during reading, and vice versa during writing. It also takes up more space to store 1234 as text than as an integer. This overhead adds up when you do many such conversions and store large amounts of data.


> Structured text data

A more specialized form of text files is structured formats such as XML and JSON. These types of formats can present special challenges with Hadoop since splitting XML and JSON files for processing is tricky, and Hadoop does not provide a built-in InputFormat for either. JSON presents even greater challenges than XML, since there are no tokens to mark the beginning or end of a record. In the case of these formats, you have a couple of options:

1. Use a container format such as Avro. Transforming the data into Avro can provide a compact and efficient way to store and process the data.

2. Use a library designed for processing XML or JSON files. 
Examples of this for XML include XMLLoader in the PiggyBank library for Pig.For JSON, the Elephant Bird project provides the LzoJsonInputFormat.

> Binary data

Although text is typically the most common source data format stored in Hadoop, you can also use Hadoop to process binary files such as images. For most cases of storing and processing binary files in Hadoop, using a container format such as SequenceFile is preferred. If the splittable unit of binary data is larger than 64 MB, you may consider putting the data in its own file, without using a container format.

> Hadoop File Types

There are several Hadoop-specific file formats that were specifically created to work well with MapReduce. These Hadoop-specific file formats include file-based data structures such as sequence files, serialization formats like Avro, and columnar formats such as RCFile and Parquet. These file formats have differing strengths and weaknesses. 
Few characteristics these file formats have which are important for Hadoop applications include :

1. Splittable compression

2. Agnostic compression

*Agnostic compression - The file can be compressed with any compression codec, without readers having to know the codec. This is possible because the codec is stored in the header metadata of the file format.*

---


*Reference -*
[Cloudera](http://blog.cloudera.com) | 
[Hortonworks](http://hortonworks.com) | 
[O'Reilly - Hadoop Application Architectures](http://shop.oreilly.com/product/0636920033196.do)