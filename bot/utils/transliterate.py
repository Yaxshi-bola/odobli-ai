"""
Lotin ↔ Kirill transliteratsiya
O'zbek tili uchun
"""

LOTIN_TO_KIRILL = {
    "a": "а", "b": "б", "d": "д", "e": "е",
    "f": "ф", "g": "г", "h": "ҳ", "i": "и",
    "j": "ж", "k": "к", "l": "л", "m": "м",
    "n": "н", "o": "о", "p": "п", "q": "қ",
    "r": "р", "s": "с", "t": "т", "u": "у",
    "v": "в", "x": "х", "y": "й", "z": "з",
    "A": "А", "B": "Б", "D": "Д", "E": "Е",
    "F": "Ф", "G": "Г", "H": "Ҳ", "I": "И",
    "J": "Ж", "K": "К", "L": "Л", "M": "М",
    "N": "Н", "O": "О", "P": "П", "Q": "Қ",
    "R": "Р", "S": "С", "T": "Т", "U": "У",
    "V": "В", "X": "Х", "Y": "Й", "Z": "З",
}

DIGRAPHS = {
    "Sh": "Ш", "sh": "ш",
    "Ch": "Ч", "ch": "ч",
    "G'": "Ғ", "g'": "ғ",
    "O'": "Ў", "o'": "ў",
    "Ng": "Нг", "ng": "нг",
    "Yo": "Ё", "yo": "ё",
    "Yu": "Ю", "yu": "ю",
    "Ya": "Я", "ya": "я",
    "Ye": "Е", "ye": "е",
    "Ts": "Ц", "ts": "ц",
}

def lotin_to_kirill(text: str) -> str:
    if not text:
        return text
    
    # Normalize various apostrophes to standard single quote
    for char in ["‘", "’", "`", "ʻ", "ʼ"]:
        text = text.replace(char, "'")
    
    result = []
    i = 0
    
    while i < len(text):
        if i + 1 < len(text):
            pair = text[i:i+2]
            if pair in DIGRAPHS:
                result.append(DIGRAPHS[pair])
                i += 2
                continue
        
        char = text[i]
        if char in LOTIN_TO_KIRILL:
            result.append(LOTIN_TO_KIRILL[char])
        else:
            result.append(char)
        i += 1
    
    return "".join(result)

def convert_text(text: str, script: str) -> str:
    if script == "kirill":
        return lotin_to_kirill(text)
    return text
