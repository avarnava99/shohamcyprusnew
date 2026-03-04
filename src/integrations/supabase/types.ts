export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      berth_schedule: {
        Row: {
          agent: string | null
          all_fast: string | null
          comments: string | null
          created_at: string
          day: string | null
          id: string
          loa: string | null
          movement: string | null
          period_end: string | null
          period_start: string | null
          pilot_time: string | null
          quay: string | null
          received_at: string
          tug1: string | null
          tug2: string | null
          vessel_name: string
          voyage_no: string | null
        }
        Insert: {
          agent?: string | null
          all_fast?: string | null
          comments?: string | null
          created_at?: string
          day?: string | null
          id?: string
          loa?: string | null
          movement?: string | null
          period_end?: string | null
          period_start?: string | null
          pilot_time?: string | null
          quay?: string | null
          received_at?: string
          tug1?: string | null
          tug2?: string | null
          vessel_name: string
          voyage_no?: string | null
        }
        Update: {
          agent?: string | null
          all_fast?: string | null
          comments?: string | null
          created_at?: string
          day?: string | null
          id?: string
          loa?: string | null
          movement?: string | null
          period_end?: string | null
          period_start?: string | null
          pilot_time?: string | null
          quay?: string | null
          received_at?: string
          tug1?: string | null
          tug2?: string | null
          vessel_name?: string
          voyage_no?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          sender_id: string | null
          sender_type: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          sender_id?: string | null
          sender_type: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sender_id?: string | null
          sender_type?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          admin_user_id: string | null
          created_at: string
          guest_email: string | null
          guest_id: string
          guest_name: string | null
          id: string
          last_message_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_user_id?: string | null
          created_at?: string
          guest_email?: string | null
          guest_id: string
          guest_name?: string | null
          id?: string
          last_message_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_user_id?: string | null
          created_at?: string
          guest_email?: string | null
          guest_id?: string
          guest_name?: string | null
          id?: string
          last_message_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
          submission_type: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
          submission_type?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
          submission_type?: string
        }
        Relationships: []
      }
      container_orders: {
        Row: {
          address_line_2: string | null
          city: string
          comments: string | null
          company: string | null
          container_type: string
          country: string
          crane_unloading: boolean
          created_at: string
          email: string
          id: string
          latitude: number | null
          location_address: string | null
          longitude: number | null
          name: string
          phone: string
          postal_code: string
          quantity: number
          state_region: string | null
          status: string
          street_address: string
        }
        Insert: {
          address_line_2?: string | null
          city: string
          comments?: string | null
          company?: string | null
          container_type: string
          country?: string
          crane_unloading?: boolean
          created_at?: string
          email: string
          id?: string
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          name: string
          phone: string
          postal_code: string
          quantity?: number
          state_region?: string | null
          status?: string
          street_address: string
        }
        Update: {
          address_line_2?: string | null
          city?: string
          comments?: string | null
          company?: string | null
          container_type?: string
          country?: string
          crane_unloading?: boolean
          created_at?: string
          email?: string
          id?: string
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          name?: string
          phone?: string
          postal_code?: string
          quantity?: number
          state_region?: string | null
          status?: string
          street_address?: string
        }
        Relationships: []
      }
      duty_calculator_leads: {
        Row: {
          cif_value: number | null
          company: string | null
          country_of_origin: string
          created_at: string
          email: string
          estimated_duty: number | null
          estimated_duty_rate: number | null
          hs_code_estimate: string | null
          id: string
          insurance_cost: number | null
          name: string
          notes: string | null
          phone: string | null
          product_category: string | null
          product_description: string
          product_value: number
          shipping_cost: number | null
          status: string
          total_cost: number | null
          vat_amount: number | null
        }
        Insert: {
          cif_value?: number | null
          company?: string | null
          country_of_origin: string
          created_at?: string
          email: string
          estimated_duty?: number | null
          estimated_duty_rate?: number | null
          hs_code_estimate?: string | null
          id?: string
          insurance_cost?: number | null
          name: string
          notes?: string | null
          phone?: string | null
          product_category?: string | null
          product_description: string
          product_value: number
          shipping_cost?: number | null
          status?: string
          total_cost?: number | null
          vat_amount?: number | null
        }
        Update: {
          cif_value?: number | null
          company?: string | null
          country_of_origin?: string
          created_at?: string
          email?: string
          estimated_duty?: number | null
          estimated_duty_rate?: number | null
          hs_code_estimate?: string | null
          id?: string
          insurance_cost?: number | null
          name?: string
          notes?: string | null
          phone?: string | null
          product_category?: string | null
          product_description?: string
          product_value?: number
          shipping_cost?: number | null
          status?: string
          total_cost?: number | null
          vat_amount?: number | null
        }
        Relationships: []
      }
      limassol_vessel_schedule: {
        Row: {
          agent: string | null
          arrival_date: string | null
          arrival_time: string | null
          berth: string | null
          callsign: string | null
          created_at: string
          delivery_start: string | null
          etd_date: string | null
          etd_time: string | null
          id: string
          operation: string | null
          scraped_at: string
          status: string | null
          vessel_name: string
          vessel_no: string | null
          voyage_no: string | null
        }
        Insert: {
          agent?: string | null
          arrival_date?: string | null
          arrival_time?: string | null
          berth?: string | null
          callsign?: string | null
          created_at?: string
          delivery_start?: string | null
          etd_date?: string | null
          etd_time?: string | null
          id?: string
          operation?: string | null
          scraped_at?: string
          status?: string | null
          vessel_name: string
          vessel_no?: string | null
          voyage_no?: string | null
        }
        Update: {
          agent?: string | null
          arrival_date?: string | null
          arrival_time?: string | null
          berth?: string | null
          callsign?: string | null
          created_at?: string
          delivery_start?: string | null
          etd_date?: string | null
          etd_time?: string | null
          id?: string
          operation?: string | null
          scraped_at?: string
          status?: string | null
          vessel_name?: string
          vessel_no?: string | null
          voyage_no?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_analytics_breakdowns: {
        Row: {
          breakdown_type: string
          created_at: string | null
          id: string
          name: string
          period_end: string
          period_start: string
          value: number
        }
        Insert: {
          breakdown_type: string
          created_at?: string | null
          id?: string
          name: string
          period_end: string
          period_start: string
          value?: number
        }
        Update: {
          breakdown_type?: string
          created_at?: string | null
          id?: string
          name?: string
          period_end?: string
          period_start?: string
          value?: number
        }
        Relationships: []
      }
      site_analytics_daily: {
        Row: {
          bounce_rate: number | null
          created_at: string | null
          date: string
          id: string
          pageviews: number
          pageviews_per_visit: number | null
          session_duration: number | null
          visitors: number
        }
        Insert: {
          bounce_rate?: number | null
          created_at?: string | null
          date: string
          id?: string
          pageviews?: number
          pageviews_per_visit?: number | null
          session_duration?: number | null
          visitors?: number
        }
        Update: {
          bounce_rate?: number | null
          created_at?: string | null
          date?: string
          id?: string
          pageviews?: number
          pageviews_per_visit?: number | null
          session_duration?: number | null
          visitors?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
