# speech-type

Software needed: Python 3, RStudio, Node.js

In Analysis/:
- comp_files/ and trans_files/ hold the raw data collected from the experiment
- autogen/ and figures/ have files and figures produced by the R scripts
- transcription/ has the transcription phrase sets for all participants
- createPhraseSet.py is the Python script to create phrase sets
- parse_more.csv and parse_trans.csv have the parsed data that the R scripts use
- data_comp_test.csv is output by parseInput.py, and has the correctMsg and gMsg columns manually added in before being used by parseMore.py
- data_trans_test.csv is output by parseTrans.py, and is input for parseMoreTrans.py
- parseInput.py and parseTrans.py are python scripts that take the raw data and parse it to an intermediate stage
- parseMore.py and parseMoreTrans.py are used to further parse data for use in R
- oovCalc.py is used for the out-of-vocab calculations, and uses email64k.txt
- Mobile Input Experiment Survey Responses.csv has data for the survey responses
- NASA-TLX Responses - Comp.csv and NASA-TLX Responses - Trans.csv have TLX data
- Notes.docx - Notes for composition task on whether a participant preferred typing or speech
- Notes - transcription.docx - Notes for transcription task on whether a participant preferred typing or speech
- Speech Input Stats.Rmd & .html are the main analysis, and where figures are generated
- Speech_Input_Block.Rmd & .html analyzes the effects of block on the data
- Speech_Input_Corrections.Rmd & .html analyzes effect of phrases with and without corrections on data
- Speech_Input_AC.Rmd & .html analyzes effects of autocorrect on data
- Speech_Input_Triad.Rmd & .html analyzes the effects of image triads on data
- TLX_Stats.Rmd & .html analyzes the TLX data, and the demographic survey data

In Images/:
- Two folder with the two variants of clip art. images/ holds the script used to generate triads.
- imageTriadsFINAL has the list of all triads used in the experiment

In myapp/:
- Files for the testing application, which uses Node.js
- To run, type "node app-server.js" in the myapp/ folder
- The main experiment script is in the scripts/ folder, called "Experiment.js"

Figure Descriptions:

Figure 1: Two screenshots of our testing application on an Android phone. The left screenshot demonstrates our testing application with keyboard input, and the right shows our application with speech input. The left screenshot shows 3 adjacent clip art images of a grandmother, a heart, and a teddy bear, with an incomplete phrase in a textbox beneath the images. The right screenshot shows 3 images of a swingset, money, and a mother and child, with another incomplete phrase in a textbox.
Figure 2: Four examples of image triads. Semantically similar pairs are in columns, and triads are in different rows. For instance, one row shows an apple, a doctor, and a house, but in one column, the apple is red, and in the other, the apple is green (and so on).
Figure 3: A demonstation of how our transcription phrase sets were generated, showing how half the phrases came from compositions by participants, and the other half from a common pool of phrases from the first 11 participants. 
Figure 4: Three bar graphs showing mean total times, mean prep times, and mean input times (with 95% confidence intervals) for Composition-Keyboard, Composition-Speech, Transcription-Keyboard, and Transcription-Speech. For total time and input time, keyboard input is slower than speech input, and transcription is faster than composition. For prep time, speech is slower than keyboard input.
Figure 5: A bar graph showing mean words-per-minute with 95% confidence intervals for Composition-Keyboard, Composition-Speech, Transcription-Keyboard, and Transcription-Speech. Speech input is much faster, and transcription is much faster than composition.
Figure 6: NASA-TLX results for composition and transcription. For transcription, speech is superior in every metric, but in composition, participants felt speech had reduced performance.
Table 1: 8 examples of phrases composed for two image triads: "boy", "boat", "cat", and "woman", "mom-and-baby", and "plane".
