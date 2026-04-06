"""
妊娠中の栄養ガイド PDF生成スクリプト
こもれびブランド（緑基調・A4全面使い切り）
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# --- Font Registration ---
pdfmetrics.registerFont(TTFont("NotoSansJP", "C:/Windows/Fonts/NotoSansJP-VF.ttf"))

# --- Colors ---
GREEN_DARK = HexColor("#2d6a3f")
GREEN_PRIMARY = HexColor("#3a7d44")
GREEN_LIGHT = HexColor("#e8f5e9")
GREEN_ACCENT = HexColor("#a5d6a7")
CREAM_BG = HexColor("#fdfaf5")
WARM_GRAY = HexColor("#5a5248")
RED_BADGE = HexColor("#e53935")
RED_LIGHT = HexColor("#ffebee")
AMBER_BADGE = HexColor("#f57f17")
AMBER_LIGHT = HexColor("#fff8e1")
YELLOW_LIGHT = HexColor("#fffde7")
BORDER_GRAY = HexColor("#e0dcd6")
TEXT_DARK = HexColor("#2c2417")
TEXT_MUTED = HexColor("#6b6359")

W, H = A4  # 210mm x 297mm
MARGIN = 12 * mm
INNER_W = W - 2 * MARGIN


def draw_page1(c):
    """Page 1: Title + Nutrient Table"""
    # Background
    c.setFillColor(CREAM_BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Top header bar
    c.setFillColor(GREEN_PRIMARY)
    c.rect(0, H - 42 * mm, W, 42 * mm, fill=1, stroke=0)

    # Title
    c.setFillColor(white)
    c.setFont("NotoSansJP", 22)
    c.drawCentredString(W / 2, H - 18 * mm, "妊娠中の栄養ガイド")
    c.setFont("NotoSansJP", 10)
    c.drawCentredString(W / 2, H - 26 * mm, "必要な栄養素・おすすめ食材・レシピ例")

    # Decorative leaf line
    c.setFont("NotoSansJP", 8)
    c.drawCentredString(W / 2, H - 34 * mm, "厚生労働省「日本人の食事摂取基準」に基づく情報")

    # --- Nutrient Table ---
    y_start = H - 50 * mm

    # Table header
    c.setFillColor(GREEN_DARK)
    c.rect(MARGIN, y_start - 8 * mm, INNER_W, 8 * mm, fill=1, stroke=0)

    col_x = [MARGIN, MARGIN + 28 * mm, MARGIN + 72 * mm, MARGIN + 120 * mm]
    col_w = [28 * mm, 44 * mm, 48 * mm, INNER_W - 120 * mm]
    headers = ["栄養素", "推奨量", "主な食材", "簡単レシピ例"]

    c.setFillColor(white)
    c.setFont("NotoSansJP", 7.5)
    for i, header in enumerate(headers):
        c.drawString(col_x[i] + 2 * mm, y_start - 6 * mm, header)

    # Table rows
    nutrients = [
        ("葉酸", "480\u03bcg/日+サプリ400\u03bcg(初期)", "ほうれん草・ブロッコリー・枝豆・納豆", "ほうれん草と卵のスープ、枝豆ごはん"),
        ("鉄分", "初期9mg\u2192中後期16mg/日", "赤身牛肉・あさり・小松菜・ひじき", "牛肉とピーマン炒め、あさりの味噌汁"),
        ("カルシウム", "650mg/日", "牛乳・豆腐・しらす・小松菜", "しらすと小松菜のふりかけ、豆腐チャンプルー"),
        ("DHA", "n-3系1.6g/日", "サバ・サンマ・イワシ・鮭", "サバの味噌煮、鮭のホイル焼き"),
        ("ビタミンD", "8.5\u03bcg/日", "鮭・しらす干し・干し椎茸・卵黄", "鮭の塩焼き、きのこの炊き込みごはん"),
        ("たんぱく質", "初期50g\u2192後期75g/日", "鶏むね肉・鮭・卵・豆腐・納豆", "鶏の照り焼き、豆乳スープ"),
        ("亜鉛", "10mg/日", "牛赤身肉・卵・納豆・アーモンド", "牛肉のしぐれ煮、納豆オムレツ"),
        ("ビタミンB群", "B6:1.3mg B12:2.8\u03bcg/日", "豚肉・カツオ・バナナ・しじみ", "豚の生姜焼き、しじみの味噌汁"),
        ("ビタミンC", "110mg/日", "いちご・キウイ・ピーマン", "フルーツヨーグルト、ツナサラダ"),
        ("食物繊維", "18g/日以上", "ごぼう・さつまいも・きのこ・わかめ", "きんぴらごぼう、さつまいもの甘煮"),
    ]

    row_h = 9.5 * mm
    y = y_start - 8 * mm

    for idx, (name, amount, foods, recipes) in enumerate(nutrients):
        y -= row_h
        # Alternate row background
        if idx % 2 == 0:
            c.setFillColor(GREEN_LIGHT)
        else:
            c.setFillColor(white)
        c.rect(MARGIN, y, INNER_W, row_h, fill=1, stroke=0)

        # Row border
        c.setStrokeColor(BORDER_GRAY)
        c.setLineWidth(0.3)
        c.line(MARGIN, y, MARGIN + INNER_W, y)

        # Column separators
        for cx in col_x[1:]:
            c.line(cx, y, cx, y + row_h)

        # Text
        text_y = y + 5.5 * mm
        text_y2 = y + 1.5 * mm

        # Nutrient name (bold-ish)
        c.setFillColor(GREEN_DARK)
        c.setFont("NotoSansJP", 8)
        c.drawString(col_x[0] + 2 * mm, text_y, name)

        # Amount
        c.setFillColor(TEXT_DARK)
        c.setFont("NotoSansJP", 6.5)
        c.drawString(col_x[1] + 2 * mm, text_y, amount)

        # Foods
        c.setFillColor(TEXT_MUTED)
        c.setFont("NotoSansJP", 6.5)
        # Split long text into 2 lines if needed
        if len(foods) > 16:
            mid = foods.find("・", len(foods) // 2 - 3)
            if mid > 0:
                c.drawString(col_x[2] + 2 * mm, text_y, foods[:mid + 1])
                c.drawString(col_x[2] + 2 * mm, text_y2, foods[mid + 1:])
            else:
                c.drawString(col_x[2] + 2 * mm, y + 3.5 * mm, foods)
        else:
            c.drawString(col_x[2] + 2 * mm, y + 3.5 * mm, foods)

        # Recipes
        c.setFillColor(TEXT_MUTED)
        if len(recipes) > 16:
            mid = recipes.find("、")
            if mid > 0:
                c.drawString(col_x[3] + 2 * mm, text_y, recipes[:mid + 1])
                c.drawString(col_x[3] + 2 * mm, text_y2, recipes[mid + 1:])
            else:
                c.drawString(col_x[3] + 2 * mm, y + 3.5 * mm, recipes)
        else:
            c.drawString(col_x[3] + 2 * mm, y + 3.5 * mm, recipes)

    # Table outer border
    table_h = 8 * mm + row_h * len(nutrients)
    c.setStrokeColor(GREEN_DARK)
    c.setLineWidth(0.8)
    c.rect(MARGIN, y_start - table_h, INNER_W, table_h, fill=0, stroke=1)

    # --- 1日の献立例 section ---
    y_menu = y - 8 * mm

    # Section header
    c.setFillColor(GREEN_PRIMARY)
    c.setFont("NotoSansJP", 10)
    c.drawString(MARGIN, y_menu, "1日の献立例（妊娠中期）")

    c.setStrokeColor(GREEN_ACCENT)
    c.setLineWidth(1.5)
    c.line(MARGIN, y_menu - 2 * mm, MARGIN + 70 * mm, y_menu - 2 * mm)

    y_menu -= 8 * mm

    meals = [
        ("朝食", "ごはん+納豆(葉酸・たんぱく質) / しじみの味噌汁(鉄分・B12) / ヨーグルト+いちご(Ca・ビタミンC)"),
        ("昼食", "鮭の塩焼き定食(DHA・ビタミンD) / ほうれん草のおひたし(葉酸・鉄分) / きんぴらごぼう(食物繊維)"),
        ("夕食", "牛肉とピーマン炒め(鉄分・亜鉛・ビタミンC) / 豆腐とわかめの味噌汁(Ca) / 切り干し大根の煮物"),
        ("間食", "アーモンド少量(亜鉛・ビタミンE) / バナナ(ビタミンB6・食物繊維)"),
    ]

    # 3-column layout for meals
    meal_col_w = INNER_W / 2 - 2 * mm
    for i, (meal_name, detail) in enumerate(meals):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (meal_col_w + 4 * mm)
        my = y_menu - row * 16 * mm

        # Meal card
        c.setFillColor(white)
        c.setStrokeColor(BORDER_GRAY)
        c.setLineWidth(0.4)
        c.roundRect(x, my - 13 * mm, meal_col_w, 14 * mm, 2 * mm, fill=1, stroke=1)

        # Meal badge
        c.setFillColor(GREEN_PRIMARY)
        c.roundRect(x + 2 * mm, my - 1.5 * mm, 14 * mm, 5 * mm, 1.5 * mm, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("NotoSansJP", 7)
        c.drawString(x + 4.5 * mm, my - 0.5 * mm, meal_name)

        # Meal detail
        c.setFillColor(TEXT_MUTED)
        c.setFont("NotoSansJP", 5.8)
        # Wrap text
        parts = detail.split(" / ")
        for j, part in enumerate(parts):
            c.drawString(x + 3 * mm, my - 5 * mm - j * 3.2 * mm, part)

    # --- Footer ---
    c.setFillColor(GREEN_DARK)
    c.rect(0, 0, W, 8 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("NotoSansJP", 6)
    c.drawCentredString(W / 2, 2.5 * mm, "出典：厚生労働省「日本人の食事摂取基準」（2020年版・2025年版）/ こもれび  komorebi.constella-hd.co.jp")


def draw_page2(c):
    """Page 2: Period Guide + Avoid Foods + Memo"""
    # Background
    c.setFillColor(CREAM_BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # --- Section 1: 妊娠期別の重点栄養素 ---
    y = H - MARGIN

    c.setFillColor(GREEN_PRIMARY)
    c.setFont("NotoSansJP", 12)
    c.drawString(MARGIN, y - 4 * mm, "妊娠期別の重点栄養素")
    c.setStrokeColor(GREEN_ACCENT)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 7 * mm, MARGIN + 70 * mm, y - 7 * mm)

    y -= 14 * mm

    periods = [
        ("初期（0〜13週）", "#4caf50", "+50 kcal/日",
         "葉酸サプリ400\u03bcg/日が最重要", "ビタミンB6（つわり軽減）",
         "食べられるものを食べられる時に"),
        ("中期（14〜27週）", "#ff9800", "+250 kcal/日",
         "鉄分の需要が急増（+9.5mg）", "カルシウム（骨格形成）",
         "たんぱく質+5g。バランス食を意識"),
        ("後期（28週〜）", "#e65100", "+450 kcal/日",
         "たんぱく質+25g（胎児の急成長）", "DHA（脳発達のピーク）",
         "鉄分（出産時の出血に備える）"),
    ]

    card_w = (INNER_W - 4 * mm) / 3

    for i, (period, color, energy, p1, p2, p3) in enumerate(periods):
        x = MARGIN + i * (card_w + 2 * mm)

        # Card background
        c.setFillColor(white)
        c.setStrokeColor(HexColor(color))
        c.setLineWidth(1)
        c.roundRect(x, y - 40 * mm, card_w, 40 * mm, 2 * mm, fill=1, stroke=1)

        # Period header
        c.setFillColor(HexColor(color))
        c.roundRect(x, y - 0.5 * mm, card_w, 9 * mm, 2 * mm, fill=1, stroke=0)
        # Cover bottom corners of header
        c.rect(x, y - 5 * mm, card_w, 5 * mm, fill=1, stroke=0)

        c.setFillColor(white)
        c.setFont("NotoSansJP", 8)
        c.drawCentredString(x + card_w / 2, y + 3 * mm, period)
        c.setFont("NotoSansJP", 6.5)
        c.drawCentredString(x + card_w / 2, y - 2 * mm, f"エネルギー{energy}")

        # Points
        c.setFillColor(TEXT_DARK)
        c.setFont("NotoSansJP", 6.2)
        points = [p1, p2, p3]
        for j, point in enumerate(points):
            py = y - 12 * mm - j * 8 * mm
            c.setFillColor(GREEN_PRIMARY)
            c.circle(x + 5 * mm, py + 1 * mm, 1 * mm, fill=1, stroke=0)
            c.setFillColor(TEXT_DARK)
            c.drawString(x + 8 * mm, py, point)

    y -= 50 * mm

    # --- Section 2: 避けるべき食品 ---
    c.setFillColor(GREEN_PRIMARY)
    c.setFont("NotoSansJP", 12)
    c.drawString(MARGIN, y, "避けるべき食品・注意が必要な食品")
    c.setStrokeColor(GREEN_ACCENT)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3 * mm, MARGIN + 85 * mm, y - 3 * mm)

    y -= 10 * mm

    # Three columns: 禁止 / 制限 / 注意
    sec_w = (INNER_W - 4 * mm) / 3
    sections = [
        ("禁止", RED_BADGE, RED_LIGHT, [
            "アルコール → 完全禁止",
            "生肉・レアステーキ",
            "  → トキソプラズマ感染",
            "非加熱ナチュラルチーズ",
            "  → リステリア菌",
            "生ハム・スモークサーモン",
        ]),
        ("制限", HexColor("#f57f17"), AMBER_LIGHT, [
            "大型魚（メカジキ等）",
            "  → 週1回80gまで",
            "カフェイン",
            "  → 200〜300mg/日以下",
            "レバー → 週1回少量",
            "うなぎ蒲焼 → 週1回",
        ]),
        ("注意", HexColor("#f9a825"), YELLOW_LIGHT, [
            "生卵 → サルモネラ菌",
            "刺身・寿司 → 食中毒",
            "昆布 → ヨウ素過剰注意",
            "ひじき → 週2回まで",
            "",
            "※加熱で多くのリスク軽減",
        ]),
    ]

    for i, (label, badge_color, bg_color, items) in enumerate(sections):
        x = MARGIN + i * (sec_w + 2 * mm)
        card_h = 42 * mm

        # Card
        c.setFillColor(bg_color)
        c.setStrokeColor(badge_color)
        c.setLineWidth(0.8)
        c.roundRect(x, y - card_h, sec_w, card_h, 2 * mm, fill=1, stroke=1)

        # Badge
        c.setFillColor(badge_color)
        badge_w = 16 * mm
        c.roundRect(x + (sec_w - badge_w) / 2, y - 2 * mm, badge_w, 6 * mm, 2 * mm, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("NotoSansJP", 8)
        c.drawCentredString(x + sec_w / 2, y, label)

        # Items
        c.setFillColor(TEXT_DARK)
        c.setFont("NotoSansJP", 6)
        for j, item in enumerate(items):
            if item:
                iy = y - 10 * mm - j * 4.8 * mm
                c.drawString(x + 3 * mm, iy, item)

    y -= 52 * mm

    # --- Section 3: メモ欄 ---
    c.setFillColor(GREEN_PRIMARY)
    c.setFont("NotoSansJP", 10)
    c.drawString(MARGIN, y, "メモ（気になること・医師に聞きたいこと）")

    y -= 5 * mm
    memo_h = y - 8 * mm  # Leave space for footer
    memo_top = y

    # Memo box
    c.setFillColor(white)
    c.setStrokeColor(GREEN_ACCENT)
    c.setLineWidth(0.8)
    c.roundRect(MARGIN, 8 * mm, INNER_W, memo_h, 3 * mm, fill=1, stroke=1)

    # Ruled lines
    c.setStrokeColor(HexColor("#e8e4de"))
    c.setLineWidth(0.3)
    line_spacing = 7 * mm
    ly = memo_top - line_spacing
    while ly > 12 * mm:
        c.line(MARGIN + 3 * mm, ly, MARGIN + INNER_W - 3 * mm, ly)
        ly -= line_spacing

    # --- Footer ---
    c.setFillColor(GREEN_DARK)
    c.rect(0, 0, W, 8 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("NotoSansJP", 6)
    c.drawCentredString(W / 2, 2.5 * mm, "出典：厚生労働省「日本人の食事摂取基準」（2020年版・2025年版）/ こもれび  komorebi.constella-hd.co.jp")


def main():
    output_path = "C:/Users/mineo/ClaudeProjects/komorebi/public/pdf/pregnancy-nutrition.pdf"
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle("妊娠中の栄養ガイド")
    c.setAuthor("こもれび")
    c.setSubject("妊娠中に必要な栄養素・おすすめ食材・レシピ例")

    draw_page1(c)
    c.showPage()
    draw_page2(c)
    c.showPage()
    c.save()
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    main()
