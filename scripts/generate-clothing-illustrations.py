"""
こもれび — 赤ちゃん肌着イラスト生成スクリプト
Tender Geometry デザイン哲学に基づく
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

# Paths
OUTPUT_DIR = "C:/Users/mineo/ClaudeProjects/komorebi/public/images/clothing"
FONT_PATH = "C:/Windows/Fonts/NotoSansJP-VF.ttf"
FONT_SERIF_PATH = "C:/Windows/Fonts/NotoSerifJP-VF.ttf"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Tender Geometry palette
BG = (248, 246, 240)         # warm cream
GARMENT = (255, 255, 252)    # soft white
OUTLINE = (180, 170, 155)    # warm gray
STITCH = (200, 192, 180)     # dashed stitch
ACCENT_SAGE = (140, 170, 140)  # sage green
ACCENT_ROSE = (200, 165, 155)  # dusty rose
SHADOW = (235, 230, 222)     # subtle shadow
LABEL_COLOR = (100, 90, 75)  # warm dark
SUBLABEL = (160, 150, 135)   # muted

def get_font(size, serif=False):
    path = FONT_SERIF_PATH if serif else FONT_PATH
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def draw_rounded_rect(draw, bbox, radius, fill, outline=None, width=1):
    x0, y0, x1, y1 = bbox
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def draw_dashed_line(draw, start, end, color, width=1, dash_len=6, gap_len=4):
    x0, y0 = start
    x1, y1 = end
    dx = x1 - x0
    dy = y1 - y0
    length = math.sqrt(dx*dx + dy*dy)
    if length == 0:
        return
    ux, uy = dx/length, dy/length
    pos = 0
    while pos < length:
        sx = x0 + ux * pos
        sy = y0 + uy * pos
        end_pos = min(pos + dash_len, length)
        ex = x0 + ux * end_pos
        ey = y0 + uy * end_pos
        draw.line([(sx, sy), (ex, ey)], fill=color, width=width)
        pos += dash_len + gap_len

def draw_tie(draw, x, y, angle_deg, length=40, color=OUTLINE):
    angle = math.radians(angle_deg)
    ex = x + math.cos(angle) * length
    ey = y + math.sin(angle) * length
    draw.line([(x, y), (ex, ey)], fill=color, width=2)
    # small bow at end
    bow_r = 5
    draw.ellipse([ex-bow_r, ey-bow_r, ex+bow_r, ey+bow_r], outline=color, width=1)


# ──────────────────────────────────────
# 1. 短肌着 (Tan-hadagi)
# ──────────────────────────────────────
def create_tan_hadagi():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 270

    # Shadow
    draw.ellipse([cx-130, cy+85, cx+130, cy+105], fill=SHADOW)

    # Body (short, waist length)
    body_pts = [
        (cx-100, cy-70),   # left shoulder
        (cx-60, cy-90),    # left neck
        (cx, cy-95),       # center neck
        (cx+60, cy-90),    # right neck
        (cx+100, cy-70),   # right shoulder
        (cx+110, cy-40),   # right sleeve bottom
        (cx+80, cy-35),    # right armpit
        (cx+85, cy+80),    # right hem
        (cx-85, cy+80),    # left hem
        (cx-80, cy-35),    # left armpit
        (cx-110, cy-40),   # left sleeve bottom
    ]
    draw.polygon(body_pts, fill=GARMENT, outline=OUTLINE, width=2)

    # Front overlap line (前合わせ)
    draw.line([(cx-10, cy-93), (cx+30, cy+80)], fill=STITCH, width=1)

    # Stitching details - neckline
    draw_dashed_line(draw, (cx-55, cy-87), (cx+55, cy-87), STITCH, width=1)
    # Hem stitch
    draw_dashed_line(draw, (cx-80, cy+75), (cx+80, cy+75), STITCH, width=1)

    # Ties (紐)
    draw_tie(draw, cx-20, cy-60, -150, length=35, color=ACCENT_SAGE)
    draw_tie(draw, cx+20, cy-60, -30, length=35, color=ACCENT_SAGE)
    # Inner tie
    draw_tie(draw, cx+40, cy-30, 20, length=30, color=ACCENT_SAGE)

    # Small snap circles at tie points
    draw.ellipse([cx-23, cy-63, cx-17, cy-57], fill=ACCENT_SAGE, outline=ACCENT_SAGE)
    draw.ellipse([cx+17, cy-63, cx+23, cy-57], fill=ACCENT_SAGE, outline=ACCENT_SAGE)

    # Label
    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+140), "短肌着", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+185), "たんはだぎ ─ 基本の1枚。丈は腰まで", fill=SUBLABEL, font=font_sub, anchor="mt")

    # Subtle brand mark
    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "tan-hadagi.png"), quality=95)
    print("✓ 短肌着")


# ──────────────────────────────────────
# 2. コンビ肌着 (Combi-hadagi)
# ──────────────────────────────────────
def create_combi_hadagi():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 250

    # Shadow
    draw.ellipse([cx-130, cy+125, cx+130, cy+145], fill=SHADOW)

    # Body (longer, with split legs)
    body_top = [
        (cx-100, cy-70),
        (cx-60, cy-90),
        (cx, cy-95),
        (cx+60, cy-90),
        (cx+100, cy-70),
        (cx+110, cy-40),
        (cx+80, cy-35),
        (cx+85, cy+50),    # waist right
    ]
    body_right_leg = [
        (cx+85, cy+50),
        (cx+80, cy+120),
        (cx+15, cy+120),
        (cx+5, cy+50),
    ]
    body_left_leg = [
        (cx-5, cy+50),
        (cx-15, cy+120),
        (cx-80, cy+120),
        (cx-85, cy+50),
    ]
    body_left_top = [
        (cx-85, cy+50),
        (cx-80, cy-35),
        (cx-110, cy-40),
    ]

    full_body = body_top + body_right_leg[1:] + list(reversed(body_left_leg)) + body_left_top
    draw.polygon(full_body, fill=GARMENT, outline=OUTLINE, width=2)

    # Snap buttons at crotch (股下スナップ)
    for i in range(3):
        sx = cx + (i-1)*25
        sy = cy + 120
        draw.ellipse([sx-4, sy-4, sx+4, sy+4], fill=None, outline=ACCENT_ROSE, width=2)
        draw.ellipse([sx-2, sy-2, sx+2, sy+2], fill=ACCENT_ROSE)

    # Inner leg line
    draw.line([(cx, cy+50), (cx, cy+118)], fill=STITCH, width=1)

    # Front overlap
    draw.line([(cx-10, cy-93), (cx+30, cy+50)], fill=STITCH, width=1)

    # Neckline stitch
    draw_dashed_line(draw, (cx-55, cy-87), (cx+55, cy-87), STITCH, width=1)

    # Ties
    draw_tie(draw, cx-20, cy-60, -150, length=35, color=ACCENT_SAGE)
    draw_tie(draw, cx+20, cy-60, -30, length=35, color=ACCENT_SAGE)

    draw.ellipse([cx-23, cy-63, cx-17, cy-57], fill=ACCENT_SAGE)
    draw.ellipse([cx+17, cy-63, cx+23, cy-57], fill=ACCENT_SAGE)

    # Label
    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+170), "コンビ肌着", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+215), "股下スナップでバタバタしてもはだけない", fill=SUBLABEL, font=font_sub, anchor="mt")

    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "combi-hadagi.png"), quality=95)
    print("✓ コンビ肌着")


# ──────────────────────────────────────
# 3. ボディ肌着 / ロンパース (Body-hadagi)
# ──────────────────────────────────────
def create_body_hadagi():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 250

    draw.ellipse([cx-120, cy+105, cx+120, cy+125], fill=SHADOW)

    # Body (t-shirt shape with snap crotch)
    pts = [
        (cx-90, cy-65),   # left shoulder
        (cx-45, cy-85),   # left neck
        (cx, cy-88),
        (cx+45, cy-85),
        (cx+90, cy-65),   # right shoulder
        (cx+105, cy-30),  # sleeve
        (cx+75, cy-25),   # armpit
        (cx+80, cy+70),   # right waist
        (cx+50, cy+100),  # right crotch
        (cx, cy+105),     # center crotch
        (cx-50, cy+100),
        (cx-80, cy+70),
        (cx-75, cy-25),
        (cx-105, cy-30),
    ]
    draw.polygon(pts, fill=GARMENT, outline=OUTLINE, width=2)

    # Snap buttons at crotch
    for i in range(3):
        sx = cx + (i-1)*22
        sy = cy + 103
        draw.ellipse([sx-4, sy-4, sx+4, sy+4], fill=None, outline=ACCENT_ROSE, width=2)
        draw.ellipse([sx-2, sy-2, sx+2, sy+2], fill=ACCENT_ROSE)

    # Head opening circle hint
    draw.arc([cx-30, cy-100, cx+30, cy-75], start=200, end=340, fill=STITCH, width=1)

    # Neckline stitch
    draw_dashed_line(draw, (cx-40, cy-83), (cx+40, cy-83), STITCH, width=1)

    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+150), "ボディ肌着", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+195), "かぶるタイプ。首すわり後から活躍", fill=SUBLABEL, font=font_sub, anchor="mt")

    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "body-hadagi.png"), quality=95)
    print("✓ ボディ肌着")


# ──────────────────────────────────────
# 4. ツーウェイオール (Two-way-all)
# ──────────────────────────────────────
def create_two_way_all():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 230

    draw.ellipse([cx-130, cy+145, cx+130, cy+165], fill=SHADOW)

    # Full body coverall with feet
    pts = [
        (cx-95, cy-65),
        (cx-50, cy-85),
        (cx, cy-90),
        (cx+50, cy-85),
        (cx+95, cy-65),
        (cx+115, cy-20),  # sleeve right
        (cx+85, cy-10),
        (cx+80, cy+60),
        (cx+75, cy+140),  # right foot
        (cx+40, cy+145),
        (cx+15, cy+60),
        (cx, cy+55),
        (cx-15, cy+60),
        (cx-40, cy+145),
        (cx-75, cy+140),
        (cx-80, cy+60),
        (cx-85, cy-10),
        (cx-115, cy-20),
    ]
    draw.polygon(pts, fill=GARMENT, outline=OUTLINE, width=2)

    # Center front snaps (前開きスナップ)
    for i in range(6):
        sy = cy - 70 + i * 35
        draw.ellipse([cx-4, sy-4, cx+4, sy+4], fill=None, outline=ACCENT_SAGE, width=2)
        draw.ellipse([cx-2, sy-2, cx+2, sy+2], fill=ACCENT_SAGE)

    # Neckline
    draw_dashed_line(draw, (cx-45, cy-82), (cx+45, cy-82), STITCH, width=1)
    # Collar detail
    draw.arc([cx-35, cy-95, cx+35, cy-75], start=0, end=180, fill=OUTLINE, width=1)

    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+185), "ツーウェイオール", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+230), "ドレスにもカバーオールにもなる万能着", fill=SUBLABEL, font=font_sub, anchor="mt")

    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "two-way-all.png"), quality=95)
    print("✓ ツーウェイオール")


# ──────────────────────────────────────
# 5. カバーオール (Coverall)
# ──────────────────────────────────────
def create_coverall():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 225

    draw.ellipse([cx-135, cy+150, cx+135, cy+170], fill=SHADOW)

    # Full coverall with long sleeves and feet
    pts = [
        (cx-90, cy-65),
        (cx-45, cy-85),
        (cx, cy-90),
        (cx+45, cy-85),
        (cx+90, cy-65),
        (cx+125, cy-15),  # long sleeve right
        (cx+105, cy-5),
        (cx+85, cy-10),
        (cx+80, cy+60),
        (cx+78, cy+145),
        (cx+40, cy+148),
        (cx+15, cy+65),
        (cx, cy+60),
        (cx-15, cy+65),
        (cx-40, cy+148),
        (cx-78, cy+145),
        (cx-80, cy+60),
        (cx-85, cy-10),
        (cx-105, cy-5),
        (cx-125, cy-15),
    ]
    draw.polygon(pts, fill=(240, 238, 232), outline=OUTLINE, width=2)

    # Front zipper line
    draw.line([(cx, cy-85), (cx, cy+60)], fill=STITCH, width=2)
    # Zipper pull
    draw.rectangle([cx-3, cy-50, cx+3, cy-42], fill=ACCENT_SAGE, outline=ACCENT_SAGE)

    # Feet detail
    draw.arc([cx+35, cy+130, cx+80, cy+150], start=0, end=180, fill=OUTLINE, width=1)
    draw.arc([cx-80, cy+130, cx-35, cy+150], start=0, end=180, fill=OUTLINE, width=1)

    # Collar
    draw_dashed_line(draw, (cx-40, cy-82), (cx+40, cy-82), STITCH, width=1)

    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+190), "カバーオール", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+235), "全身を覆う外出着。足先までカバー", fill=SUBLABEL, font=font_sub, anchor="mt")

    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "coverall.png"), quality=95)
    print("✓ カバーオール")


# ──────────────────────────────────────
# 6. ベスト (Vest)
# ──────────────────────────────────────
def create_vest():
    img = Image.new("RGB", (800, 600), BG)
    draw = ImageDraw.Draw(img)

    cx, cy = 400, 260

    draw.ellipse([cx-110, cy+85, cx+110, cy+100], fill=SHADOW)

    # Sleeveless vest
    pts = [
        (cx-70, cy-65),
        (cx-40, cy-80),
        (cx, cy-85),
        (cx+40, cy-80),
        (cx+70, cy-65),
        (cx+65, cy-35),   # armhole right
        (cx+70, cy+75),   # hem right
        (cx-70, cy+75),   # hem left
        (cx-65, cy-35),   # armhole left
    ]
    draw.polygon(pts, fill=(245, 240, 230), outline=OUTLINE, width=2)

    # Front snap buttons
    for i in range(3):
        sy = cy - 50 + i * 40
        draw.ellipse([cx-4, sy-4, cx+4, sy+4], fill=None, outline=ACCENT_ROSE, width=2)
        draw.ellipse([cx-2, sy-2, cx+2, sy+2], fill=ACCENT_ROSE)

    # Center line
    draw.line([(cx, cy-82), (cx, cy+73)], fill=STITCH, width=1)

    # Armhole curves
    draw.arc([cx+50, cy-55, cx+80, cy-15], start=270, end=90, fill=OUTLINE, width=1)
    draw.arc([cx-80, cy-55, cx-50, cy-15], start=90, end=270, fill=OUTLINE, width=1)

    # Neckline
    draw.arc([cx-35, cy-95, cx+35, cy-72], start=0, end=180, fill=OUTLINE, width=1)

    font_label = get_font(36, serif=True)
    font_sub = get_font(16)
    draw.text((cx, cy+120), "ベスト", fill=LABEL_COLOR, font=font_label, anchor="mt")
    draw.text((cx, cy+165), "体温調節の味方。秋冬に1〜2枚", fill=SUBLABEL, font=font_sub, anchor="mt")

    font_tiny = get_font(11)
    draw.text((760, 575), "こもれび", fill=(210, 205, 195), font=font_tiny, anchor="rb")

    img.save(os.path.join(OUTPUT_DIR, "vest.png"), quality=95)
    print("✓ ベスト")


# ──────────────────────────────────────
# Generate all
# ──────────────────────────────────────
if __name__ == "__main__":
    print("Generating clothing illustrations...")
    create_tan_hadagi()
    create_combi_hadagi()
    create_body_hadagi()
    create_two_way_all()
    create_coverall()
    create_vest()
    print(f"\nAll illustrations saved to {OUTPUT_DIR}")
