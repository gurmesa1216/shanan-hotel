-- ═══════════════════════════════════════════════════════
-- Shanan Hotel — Seed data
-- Run after schema.sql to populate initial categories & dishes.
-- ═══════════════════════════════════════════════════════

USE shanan_hotel;

-- ── Categories ──
INSERT INTO categories (name, icon) VALUES
  ('All', '🍽️'),
  ('Traditional', '🫕'),
  ('Vegan (Fasting)', '🌿'),
  ('Grilled (Tibs)', '🔥'),
  ('Coffee & Drinks', '☕'),
  ('Desserts', '🍯');

-- ── Dishes ──
INSERT INTO dishes (category_id, name, description, price, `portion`, image_url, gallery, rating, prep_time_minutes, restaurant, available) VALUES
  (2, 'Doro Wat',
   'A rich, deeply spiced chicken stew simmered for hours in a robust berbere sauce with caramelised onions and spiced butter (niter kibbeh), served alongside freshly made injera. A cornerstone of Ethiopian celebration cooking.',
   350, 'Serves 1 • 420g',
   'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/5560736/pexels-photo-5560736.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.8, 20, 'Shanan Hotel Kitchen', TRUE),

  (4, 'Tibs (Beef)',
   'Tender cubes of prime beef sautéed with rosemary, fresh tomatoes, green peppers and mitmita spice in a sizzling clay pot. Served with injera or rice.',
   420, 'Serves 1 • 300g',
   'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.7, 15, 'Shanan Hotel Kitchen', TRUE),

  (3, 'Shiro Firfir',
   'Smooth chickpea and broad-bean flour stew spiced with onions, garlic and Ethiopian spices, tossed with torn injera pieces. A beloved fasting-day favourite.',
   180, 'Serves 1 • 350g',
   'https://images.pexels.com/photos/5560760/pexels-photo-5560760.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/5560760/pexels-photo-5560760.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.6, 12, 'Shanan Hotel Kitchen', TRUE),

  (2, 'Kitfo',
   'Ethiopian steak tartare — lean minced beef seasoned with mitmita chilli powder and niter kibbeh spiced butter. Served leb leb (lightly warmed) or raw, with ayib cheese and gomen greens.',
   480, 'Serves 1 • 280g',
   'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.9, 10, 'Shanan Hotel Kitchen', TRUE),

  (2, 'Injera Platter',
   'A generous sharing platter of sourdough injera topped with doro wat, misir, gomen, tikil gomen and ayib. The full Shanan Hotel dining experience on one plate.',
   560, 'Serves 2 • Mixed',
   'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.8, 25, 'Shanan Hotel Kitchen', TRUE),

  (5, 'Bunna (Coffee)',
   'Ethiopian ceremony coffee — green beans roasted tableside, ground and brewed in a jebena clay pot with a hint of cardamom. Served in small cups with optional popcorn.',
   95, '1 cup • Traditional',
   'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.9, 8, 'Shanan Hotel Kitchen', TRUE),

  (3, 'Misir Wat',
   'Split red lentils slow-cooked with berbere, caramelised onions and garlic into a thick, warming stew. Naturally vegan and deeply satisfying.',
   160, 'Serves 1 • 300g',
   'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.5, 18, 'Shanan Hotel Kitchen', TRUE),

  (6, 'Honey Cake',
   'Moist sponge cake made with tej (Ethiopian honey wine) and spiced with cinnamon and tej honey glaze. A sweet finish to your meal at Shanan Hotel.',
   120, '1 slice • 150g',
   'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
   JSON_ARRAY('https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600'),
   4.7, 5, 'Shanan Hotel Kitchen', TRUE);