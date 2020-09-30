Software needed: Python 3, RStudio, Node.js

File Descriptions:
- comp_files/ and trans_files/ hold the raw data collected from the experiment
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
- Speech Input Stats.Rmd & .html are the main analysis, and where figures are generated
- Speech_Input_Block.Rmd & .html analyzes the effects of block on the data
- Speech_Input_Corrections.Rmd & .html analyzes effect of phrases with and without corrections on data
- Speech_Input_AC.Rmd & .html analyzes effects of autocorrect on data
- Speech_Input_Triad.Rmd & .html analyzes the effects of image triads on data
- TLX_Stats.Rmd & .html analyzes the TLX data, and the demographic survey data
