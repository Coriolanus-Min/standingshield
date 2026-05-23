#!/usr/bin/env python3
"""
检查 PNG 图片中是否嵌入了 AI 生成的提示词 (prompt) 元数据。
扫描 tEXt, iTXt, zTXt chunks，搜索常见的提示词存储字段。
"""

import struct
import os
import sys
from pathlib import Path


def extract_png_text_chunks(filepath: str) -> list[tuple[str, str]]:
    """提取 PNG 文件中的所有文本 chunks"""
    chunks = []
    try:
        with open(filepath, 'rb') as f:
            # 检查 PNG 文件头
            header = f.read(8)
            if header != b'\x89PNG\r\n\x1a\n':
                return [("ERROR", "不是有效的 PNG 文件")]

            while True:
                length_bytes = f.read(4)
                if len(length_bytes) < 4:
                    break
                length = struct.unpack('>I', length_bytes)[0]
                chunk_type = f.read(4)
                data = f.read(length) if length > 0 else b''
                crc = f.read(4)

                chunk_type_str = chunk_type.decode('ascii', errors='replace')

                if chunk_type_str in ('tEXt', 'iTXt', 'zTXt'):
                    try:
                        if chunk_type_str == 'zTXt':
                            # zTXt: keyword + null + compression_method + compressed_text
                            null_idx = data.find(b'\x00')
                            if null_idx >= 0:
                                keyword = data[:null_idx].decode('utf-8', errors='replace')
                                # 跳过 compression_method (1 byte) 后面的压缩数据
                                # 简单显示关键词即可
                                compressed = True
                                text = f"[zTXt 压缩数据, 关键词: {keyword}]"
                            else:
                                text = "[无法解析的 zTXt chunk]"
                        else:
                            text = data.decode('utf-8', errors='replace')
                    except Exception as e:
                        text = f"[解码失败: {e}]"

                    chunks.append((chunk_type_str, text))

                if chunk_type_str == 'IEND':
                    break
    except Exception as e:
        chunks.append(("ERROR", str(e)))

    return chunks


# AI 图片生成工具常见的元数据关键词
PROMPT_KEYWORDS = [
    'prompt', 'Prompt', 'PROMPT',
    'parameters', 'Parameters',
    'description', 'Description',
    'comment', 'Comment',
    'Software',
    'Creation Time',
    'Author',
    'Title',
    'XML:com.adobe.xmp',
    'Raw profile type exif',
    'exif',
    'com.adobe',
]


def check_image(filepath: str) -> dict:
    """检查单张图片"""
    result = {
        'file': os.path.basename(filepath),
        'found': [],
    }
    chunks = extract_png_text_chunks(filepath)
    for chunk_type, text in chunks:
        # 检查是否包含提示词相关关键词
        is_prompt_related = any(kw.lower() in text.lower() for kw in PROMPT_KEYWORDS)
        result['found'].append({
            'type': chunk_type,
            'text': text[:500],
            'prompt_related': is_prompt_related,
        })
    return result


def main():
    base_dirs = [
        r"C:\Users\wenhe\my project\Kiro-CLI\Standing shield\public\images",
        r"C:\Users\wenhe\my project\Kiro-CLI\Standing shield\src\comparison\Standing shield2.0\images",
    ]

    png_files = []
    for base in base_dirs:
        if os.path.isdir(base):
            for f in os.listdir(base):
                if f.lower().endswith('.png'):
                    png_files.append(os.path.join(base, f))

    if not png_files:
        print("未找到 PNG 文件")
        return

    print(f"找到 {len(png_files)} 个 PNG 文件\n")
    print("=" * 70)

    found_prompts = []
    no_metadata = []

    for filepath in sorted(png_files):
        result = check_image(filepath)
        basename = result['file']

        if not result['found']:
            no_metadata.append(basename)
            continue

        has_prompt = any(c['prompt_related'] for c in result['found'])
        if has_prompt:
            found_prompts.append((basename, result['found']))
            print(f"\n{'='*70}")
            print(f"🔍 {basename} — 包含可能的提示词信息:")
            print(f"{'='*70}")
            for chunk in result['found']:
                if chunk['prompt_related']:
                    print(f"  [{chunk['type']}]")
                    print(f"  {chunk['text']}")
                    print()
        else:
            print(f"\n📄 {basename}")
            for chunk in result['found']:
                print(f"  [{chunk['type']}] {chunk['text'][:200]}")

    print(f"\n{'='*70}")
    print(f"\n总结:")
    print(f"  包含可能提示词的图片: {len(found_prompts)} 个")
    print(f"  无文本元数据: {len(no_metadata)} 个")

    if found_prompts:
        print(f"\n包含提示词的图片列表:")
        for name, _ in found_prompts:
            print(f"  - {name}")

    if no_metadata:
        print(f"\n无任何文本元数据的图片:")
        for name in sorted(no_metadata):
            print(f"  - {name}")


if __name__ == '__main__':
    main()
