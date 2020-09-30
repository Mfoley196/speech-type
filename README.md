# About

This repository contains the souce code for the experiment application and experiment analysis for the CHI paper "Comparing Smartphone Speech Recognition and Touchscreen Typing for Composition and Transcription". 
Read the associated research article for more details: [https://dl.acm.org/doi/abs/10.1145/3313831.3376861](https://dl.acm.org/doi/abs/10.1145/3313831.3376861)

If you use this code for academic purposes, please cite: Margaret Foley, Géry Casiez, and Daniel Vogel. 2020. Comparing Smartphone Speech Recognition and Touchscreen Typing for Composition and Transcription. In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems (CHI '20). Association for Computing Machinery, New York, NY, USA, 1–11. DOI:https://doi.org/10.1145/3313831.3376861

```
@inproceedings{10.1145/3313831.3376861,
author = {Foley, Margaret and Casiez, G\'{e}ry and Vogel, Daniel},
title = {Comparing Smartphone Speech Recognition and Touchscreen Typing for Composition and Transcription},
year = {2020},
isbn = {9781450367080},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3313831.3376861},
doi = {10.1145/3313831.3376861},
abstract = {Ruan et al. found transcribing short phrases with speech recognition nearly 200% faster than typing on a smartphone. We extend this comparison to a novel composition task, using a protocol that enables a controlled comparison with transcription. Results show that both composing and transcribing with speech is faster than typing. But, the magnitude of this difference is lower with composition, and speech has a lower error rate than keyboard during composition, but not during transcription. When transcribing, speech outperformed typing in most NASA-TLX measures, but when composing, there were no significant differences between typing and speech for any measure except physical demand.},
booktitle = {Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems},
pages = {1–11},
numpages = {11},
keywords = {speech recognition, text entry, mobile phones},
location = {Honolulu, HI, USA},
series = {CHI '20}
}
```

# Running the Experiment Application

Node.js is required. To run, type "node app-server.js" in the myapp/ folder on the command lime. The main experiment script is in the scripts/ folder, called "Experiment.js"

# Data Analysis

See the readme in the Analysis folder for more details.

# File Descriptions

In Analysis/:
- Files needed to analyze data.

In Images/:
- Two folders with the two variants of clip art. images/ holds the script used to generate triads.
- imageTriadsFINAL has the list of all triads used in the experiment

In myapp/:
- Files for the testing application, which uses Node.js

